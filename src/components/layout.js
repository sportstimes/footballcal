/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div id="content">
        <main>{children}</main>
        <footer>
          <ul>
            <li><Link to="/about">About</Link></li>
          </ul>
          <p id="Credits">© {new Date().getFullYear()}. Built with 💪 using <a href="https://github.com/sportstimes/gatsby-template/">The Sports Times</a>. Developed by <a href="https://sijobling.com/">Si Jobling</a>. Hosted on <a href="https://netlify.com/">Netlify</a>.</p>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
