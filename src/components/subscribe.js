//import { Link } from "gatsby"
import PropTypes from "prop-types"
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
              color: `rgba(255,255,255,0.8)`
            }}>Google Calendar</a>
        </small>      
      </p>
  </div>
)

Subscribe.propTypes = {
  siteTitle: PropTypes.string,
}

Subscribe.defaultProps = {
  siteTitle: ``,
}

export default Subscribe
