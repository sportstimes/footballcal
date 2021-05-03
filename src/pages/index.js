import React from "react"
import { graphql } from "gatsby"
import EventRow from "../components/event-row"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/subscribe"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Events = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <EventRow key={edge.node.id} post={edge.node} />)

  return (
    <Layout>

      <SEO title="All Games" />
      <h1>All Games</h1>

      <Subscribe/>

      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Summary</th>
            <th class="location">Where</th>
          </tr>
        </thead>
        <tbody>
          {Events}
        </tbody>
      </table>
      <p>
        <span role="img" aria-label="Download">⬇️</span>
        Export as 
        {` `}
        <a href="/events.ics" className="ics" download="download">ICS</a>,
        {` `}
        <a href="/feed.xml" className="rss">RSS feed</a>
        {` and `}
        <a href="/events.csv" className="csv" download="download">CSV file</a>
      </p>
     </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
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
