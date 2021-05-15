//import { Link } from "gatsby"
import React from "react"

const Subscribe = ({ tag }) => (
  <div>
  		<p>
        <span role="img" aria-label="Spiral calendar">🗓</span> 
        <a href={"webcal://footballcal.com/" + (tag ? tag.toLowerCase().replace(" ", "-") : "events") + ".ics"} className="ics">Subscribe to {tag || "all"} games in iOS, MacOS and Office</a>
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
