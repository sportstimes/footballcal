import React from "react"
import { graphql, Link } from "gatsby"
import EventRow from "../components/event-row"
import Subscribe from "../components/subscribe"
import LocalTimezone from "../components/local-timezone"

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
    .map(edge => <EventRow key={edge.node.id} post={edge.node} />)
  const listHeader = `${tag} events`
  
  return (
    <Layout>
      <SEO title={listHeader} />
      <h1>{listHeader}</h1>

      {Subscribe}

      {LocalTimezone}

      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>When</th>
            <th class="location">Where</th>
          </tr>
        </thead>
        <tbody>
          {Events}
        </tbody>
      </table>
      <p>
        <Link to="/">All matches</Link>
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
