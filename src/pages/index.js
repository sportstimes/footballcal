import React from "react"
import { graphql } from "gatsby"
import EventRow from "../components/event-row"
import LocalTimezone from "../components/local-timezone"

import Layout from "../components/layout"
import SEO from "../components/seo"

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

      <SEO title="All Events" />
      <h1>All Events</h1>

  		<p>
        <span role="img" aria-label="Spiral calendar">🗓</span> 
        <a href="webcal://kickofftimestemplate.netlify.com/events.ics" className="ics">Subscribe to all event times in iOS, MacOS and Office</a>
        <small
          style={{
            display: `block`,
          }}
        >
          or 
          {` `}
          <a href="https://support.google.com/calendar/answer/37100?hl=en"
            style={{
              textDecoration: `underline`,
              background: `none`,
              color: `rgba(255,255,255,0.8)`
            }}>Google Calendar</a>
        </small>      
      </p>
      {LocalTimezone}

      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>When</th>
            <th class="location">Where</th>
            <th class="description">What</th>
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
