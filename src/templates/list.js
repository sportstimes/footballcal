import React from "react"
import { graphql, Link } from "gatsby"
import EventRow from "../components/event-row"
import Subscribe from "../components/subscribe"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({
  pageContext,
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const { tag } = pageContext

  const Events = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map( (edge, index) => 
      <EventRow 
        key={edge.node.id} 
        post={edge.node} 
        prevDay={ edges[index-1] ? edges[index-1].node.frontmatter.date : false } />)
  const listHeader = `${tag} games`
  
  return (
    <Layout>

      <SEO title={listHeader} />
      <h1>{listHeader}</h1>

      <Subscribe tag={tag} />
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {Events}
        </tbody>
      </table>

      <p>
        <Link to="/">All games</Link>
      </p>
     </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            title
            locationName
          }
        }
      }
    }
  }
` 
