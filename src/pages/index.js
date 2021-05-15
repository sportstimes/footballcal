import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/subscribe"

const IndexPage = () => {

  return (
    <Layout>


      <SEO title="All Competitions" />
      <h1>Competitions</h1>

      <Subscribe/>
      <ul className="competitions">
        <li>
          <Link to="/euro-2020/">
            <h2>EURO 2020</h2>
            <p>11 Jun–11 Jul 2021</p>
          </Link>
        </li>
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
