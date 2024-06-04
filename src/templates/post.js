import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/subscribe"
import LocalTimezone from "../components/local-timezone"

// Utilities
import Moment from "moment"
import kebabCase from "lodash/kebabCase"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark || ''
  const tags = frontmatter.tags || ''
  const timeStatus = frontmatter.timeStatus || ''

  return (
    <Layout>

      <SEO title={frontmatter.title} />
      <div className="event-post">
        <h1>{frontmatter.title}</h1>
        <div className="datetime">
          <p className="date">{Moment(frontmatter.date).format("ddd DD MMM")}</p>
          <p className="time">
            {Moment(frontmatter.date).format("h:mma")}
            <span className="endtime">{(frontmatter.endDate ? "–" + Moment(frontmatter.endDate).format("h:mma") : "") }</span>
          </p>
          { 
          timeStatus === 'unconfirmed' ? 
          (
            <p><strong>Unconfirmed</strong></p>
          ) : ''
          }          
          {LocalTimezone}
        </div>

        <Subscribe slug={frontmatter.path} />

        <table id="EventDetails">
          <tr>
            <th>Venue</th>
            <th>TV</th>
          </tr>
          <tr>
            <td>{frontmatter.locationName}</td>
            <td className="tv-channels">
            { 
              frontmatter.tv ? 
              frontmatter.tv.map(tvChannel => (
                <span key={tvChannel}>{tvChannel}</span>
              )) : ''
            }
            </td>
          </tr>
        </table>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <h2>Want more?</h2>
        <ul className="inline">
        { 
          tags ? 
          tags.map(tag => (
            <li key={tag.fieldValue}>
            <Link to={`/${kebabCase(tag)}/`}>{tag} games</Link>
          </li>
          )) : ''
        }
        <li><Link to="/">All games</Link></li>
        </ul>

      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        endDate
        path
        title
        locationName
        tags
        tv
      }
    }
  }
`
