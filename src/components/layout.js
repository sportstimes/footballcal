/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import favicon from '../static/footballcal-32.png'
import imageUrl from '../static/footballcal-opengraph.png'
import Helmet from 'react-helmet'

import Header from "./header"
import "./layout.css"


const Layout = ({ children, type }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          social {
            twitterUsername
            twitter
          } 
        }
      }
    }
  `)

  return (
    <div>
      <Helmet>
        <link rel="icon" href={favicon} />
​
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:site" contact={data.site.siteMetadata.social.twitterUsername}></meta>
        <meta name="twitter:creator" content={data.site.siteMetadata.twitterUsername}></meta>
        <meta name="twitter:title" content={data.site.siteMetadata.title}></meta>
        <meta name="twitter:description" content={data.site.siteMetadata.description}></meta>
        <meta name="twitter:image" content={imageUrl}></meta>
​
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={data.site.siteMetadata.title} />
        <meta property="og:title" content={data.site.siteMetadata.title}></meta>
        <meta property="og:url" content={data.site.siteMetadata.siteUrl}></meta>
        <meta property="og:description" content={data.site.siteMetadata.description}></meta>
        <meta property="og:image" content={imageUrl}></meta>
        <meta property="og:image:alt" content={data.site.siteMetadata.description}></meta>
        <meta property="og:type" content={type} />
      </Helmet>
      
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
            <a href="https://www.buymeacoffee.com/si" className="button">Buy Si a beer 🍺</a>. 
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
