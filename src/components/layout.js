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
          siteUrl
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
        <meta name="twitter:image" content={data.site.siteMetadata.siteUrl + imageUrl}></meta>
​
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={data.site.siteMetadata.title} />
        <meta property="og:title" content={data.site.siteMetadata.title}></meta>
        <meta property="og:url" content={data.site.siteMetadata.siteUrl}></meta>
        <meta property="og:description" content={data.site.siteMetadata.description}></meta>
        <meta property="og:image" content={data.site.siteMetadata.siteUrl + imageUrl}></meta>
        <meta property="og:image:alt" content={data.site.siteMetadata.description}></meta>
        <meta property="og:type" content={type} />

        <script src="https://cdn.usefathom.com/script.js" data-spa="auto" data-site="SAJJHDRE" defer></script>
              
      </Helmet>
      
      <Header siteTitle={data.site.siteMetadata.title} />
      <div id="content">
        <main>{children}</main>
        <footer>
          <ul className="inline">
            <li><Link to="/about">About</Link></li>
          </ul>
          <p id="Credits">
            © 2020-{new Date().getFullYear()} Football Cal. 
            All football trademarks are copyright to respective owners. 
            Built with <a href="https://github.com/sportstimes/footballcal/">The Sports Times</a>. 
            Roadmap on <a href="https://github.com/sportstimes/footballcal/issues">Github</a>.
            Hosted on <a href="https://netlify.com/">Netlify</a>.
            Privacy-friendly analytics on <a href="https://usefathom.com/ref/SZMMNP">Fathom</a>.
            <a href="https://www.buymeacoffee.com/si" className="button">Buy Si a beer <span role="img" aria-label="beer">🍺</span></a>. 
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
