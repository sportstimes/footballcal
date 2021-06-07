module.exports = {
  siteMetadata: {
    title: `Football Cal`,
    description: `Football dates and times direct to your calendar`,
    siteUrl: `https://footballcal.com`,
    author: `@si`,
    social: {
      twitter: 'https://twitter.com/@footballcalcom',
      twitterUsername: '@footballcalcom',
      github: 'https://github.com/sportstimes/footballcal',
    },
  },
  plugins: [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `gatsby-starter-default`,
      short_name: `starter`,
      start_url: `/`,
      background_color: `#333333`,
      theme_color: `#FFCCFF`,
      display: `minimal-ui`,
      icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    },
  },
  // {
  //   resolve: `gatsby-plugin-google-fonts`,
  //   options: {
  //     fonts: [
  //       'Kelly Slab',
  //       //`source sans pro\:300,400,400i,700` // you can also specify font weights and styles
  //     ],
  //     display: 'swap'
  //   }
  // },
  `gatsby-transformer-remark`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `content`,
      path: `${__dirname}/src/content`,
    },
  },

  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                title: edge.node.frontmatter.title,
                url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                //custom_elements: [{ "content:encoded": edge.node.html }],
              })
            })
          },
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    frontmatter {
                      title
                      date
                      path
                    }
                  }
                }
              }
            }
          `,
          output: "/feed.xml",
          // optional configuration to insert feed reference in pages:
          // if `string` is used, it will be used to create RegExp and then test if pathname of
          // current page satisfied this regular expression;
          // if not provided or `undefined`, all pages will have feed reference inserted
          //match: "^/blog/",
        },
      ],
    },
  },
  {
    resolve: "gatsby-plugin-csv-feed",
    options: {
      // Query to pass to all feed serializers (optional)
      query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `,
      // Feeds
      feeds: [
        {
          query: `
            {
              allMarkdownRemark {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                      locationName
                    }
                    fields {
                      slug
                    }
                    excerpt
                  }
                }
              }
            }
          `,
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              const node = Object.assign({}, edge.node.frontmatter, edge.node.fields);
              return {
                "Title": node.title,
                "Date": node.date,
                "Location": node.locationName,
                "Description": edge.node.excerpt,
                "Details URL": `${site.siteMetadata.siteUrl}${node.slug}`,
              };
            });
          },
          output: "/events.csv",
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      host: 'https://footballcal.com',
      sitemap: 'https://footballcal.com/sitemap.xml',
      policy: [{ userAgent: '*', allow: '/' }]
    }
  }

  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
],
}
