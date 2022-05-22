/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/post.js`)
  const listTemplate = path.resolve("src/templates/list.js")
  
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              path
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }      
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges
  // Create post detail pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/${_.kebabCase(tag.fieldValue)}/`,
      component: listTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })  
}

// RSS Feed generation
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// ICS generation
const { writeFileSync } = require(`fs`)

exports.onPostBuild = async ({ graphql }) => {
  
  
  const moment = require(`moment`)
  let events = []
  let tagEvents = {}
  
  const result = await graphql(`
  {
    event: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              endDate
              locationName
              tags
              tv
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
      siteMeta: site {
        siteMetadata {
          title
          siteUrl
        }
      }
    }
    `)
    
    if (result.errors) {
      console.log(result.errors)
      throw new Error("GraphQL fail, see console output above")
    }

    const ics = require(`ics`)
    
    result.data.event.edges.forEach(({ node }) => {

      let description = node.excerpt
      if(node.frontmatter.tv !== null) {
        description =  'TV Channels: ' + node.frontmatter.tv + '\r\n' + '\r\n' + description
      }

      let dateToArray = function(date) {
        let array = moment(date).format('YYYY-M-D-H-m').split("-");
        return array.map(x => parseInt(x));
      }

      let event = {
        start: dateToArray(node.frontmatter.date),
        title: node.frontmatter.title,
        description: description,
        location: node.frontmatter.locationName,
        url: result.data.siteMeta.siteMetadata.siteUrl + node.fields.slug,
        status: 'CONFIRMED',
        categories: node.frontmatter.tags
      }
      if(node.frontmatter.endDate) {
        event.end = dateToArray(node.frontmatter.endDate)
      } else {
        event.duration = { hours: 1, minutes: 0 }
      }
      events.push(event)

      node.frontmatter.tags.forEach( tag => {
        if(!tagEvents[tag]) {
          tagEvents[tag] = [event]
        } else {
          tagEvents[tag] = [...tagEvents[tag], event]
        }
      })

      console.log('Generating event ICS…');
      ics.createEvent(event, (error, value) => {
        if (error) {
          console.log(error)
          throw new Error("ICS generation fail, see console output above")
        }
        
        let filename = node.fields.slug.slice(0, -1) + '.ics'
        writeFileSync(`${__dirname}/public/` + filename, value)
        console.log(filename + ` created`)
      })

    })

    const WorldCupJSONData = require('./src/content/bbc-world-cup-data.json');
    
    const WorldCupEvents = Object.values(WorldCupJSONData.payload[0].body.matchData[0].tournamentDatesWithEvents).flatMap(event => event.map(subEvent => subEvent.events)).flatMap(event => event).map(event => (
      {
        startTime: event.startTime, 
        homeTeam: event.homeTeam.name.full, 
        awayTeam: event.awayTeam.name.full, 
        venue: event.venue.name.full
      }
    ))

    const competitionName = 'FIFA World Cup 2022';
      
    console.log('⚽️ Generating World Cup ICS from JSON…', WorldCupEvents.length );

    WorldCupEvents.forEach( ( item ) => {

      let dateToArray = function(date) {
        let array = moment(date).format('YYYY-M-D-H-m').split("-");
        return array.map(x => parseInt(x));
      }

      let slug = `${_.kebabCase(item.homeTeam + ' ' + item.awayTeam)}`
      
      let event = {
        start: dateToArray(item.startTime),
        title: item.homeTeam + ' v ' + item.awayTeam,
        description: competitionName,
        location: item.venue,
        url: 'https://footballcal.com/world-cup-2022/' + slug,
        status: 'CONFIRMED',
        duration: { hours: 2, minutes: 0 }
      }
      events.push(event);

      ics.createEvent(event, (error, value) => {
        if (error) {
          console.log(error)
          throw new Error("ICS generation fail, see console output above")
        }
        
        let filename = `/${slug}.ics`
        writeFileSync(`${__dirname}/public` + filename, value)
        console.log(filename + ` created`)
      })
    })

    console.log('Generating global ICS…');
    ics.createEvents(events, (error, value) => {
      if (error) {
        console.log(error)
        throw new Error("ICS generation fail, see console output above")
      }
      
      writeFileSync(`${__dirname}/public/events.ics`, value)
      console.log('events.ics generated')
    })
    
    Object.keys(tagEvents).forEach( tagName => {
      console.log('Generating ' + tagName + ' ICS…')  
      ics.createEvents(tagEvents[tagName], (error, value) => {
        if (error) {
          console.log(error)
          throw new Error("ICS generation fail, see console output above")
        }
        
        let filename = tagName.toLowerCase().replace(' ','-')
        
        writeFileSync(`${__dirname}/public/` + filename + `.ics`, value)
        console.log(filename + `.ics created`)
        
      })
      
    })
    
  

}
