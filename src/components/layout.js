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
          <ul className="inline">
            <li><Link to="/about">About</Link></li>
          </ul>
          <p id="Credits">
            © {new Date().getFullYear()} Football Cal. 
            All football trademarks are copyright to respective owners. 
            Built with <a href="https://github.com/sportstimes/footballcal/">The Sports Times</a>. 
            Roadmap on <a href="https://trello.com/invite/b/KYdByEKj/8ca5511ce5b058b6bbf0f7612636085d/football-cal-%E2%9A%BD%EF%B8%8F">Trello</a>.
            Hosted on <a href="https://netlify.com/">Netlify</a>.
            Developed by <a href="https://sijobling.com/">Si Jobling</a>. 
          </p>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
