//import { Link } from "gatsby"
import React from "react"

const Subscribe = ({ siteTitle }) => (
  <div>
  		<p style={{border:'2px solid rgba(0,0,0,0.5)',padding:'1rem'}}>
        <span role="img" aria-label="Spiral calendar">🗓</span> 
        <a href="webcal://footballcal.com/events.ics" className="ics">Subscribe to all games in iOS, MacOS and Office</a>
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
              color: `rgba(0,0,0,0.8)`
            }}>Google Calendar</a>
        </small>      
      </p>
  </div>
)

export default Subscribe
