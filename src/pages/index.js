import React from "react"
import { graphql, Link } from "gatsby"
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

      <SEO title="All Competitions" />
      <h1>Competitions</h1>

      <Subscribe/>

      <ul>
        <li><Link href="/euro-2020/">EURO 2020</Link></li>
      </ul>

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
