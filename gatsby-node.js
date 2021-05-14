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
    
    // tags.forEach(tag => {
    //   tagEvents.(tag)
    // })
    // console.log('tagEvents',tagEvents);


    result.data.event.edges.forEach(({ node }) => {
      let event = {
        start: moment(node.frontmatter.date).format('YYYY-M-D-H-m').split("-"),
        title: node.frontmatter.title,
        description: node.excerpt,
        location: node.frontmatter.locationName,
        url: result.data.siteMeta.siteMetadata.siteUrl + node.fields.slug,
        status: 'CONFIRMED',
        categories: node.frontmatter.tags,
      }
      if(node.frontmatter.endDate) {
        event.end = moment(node.frontmatter.endDate).format('YYYY-M-D-H-m').split("-")
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

      // tags.forEach(tag => {

      //   if(node.frontmatter.tags.includes(tag)) {
      //     tagEvents[tag].push(event)
      //   }
      // })
    })

    const ics = require(`ics`)

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
        
        //console.log(value)  
        writeFileSync(`${__dirname}/public/` + tagName.toLowerCase() + `.ics`, value)
        console.log(tagName.toLowerCase() + `.ics created`)
        
      })
      
    })
    
  

}
