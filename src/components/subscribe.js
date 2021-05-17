//import { Link } from "gatsby"
import React from "react"
var os = require("os");
var siteAddress = os.hostname();

function getCalendarUrl(siteAddress, tag, slug) {
  let calendarUrl = siteAddress 
   
  if(tag) {
    calendarUrl += "/" + tag.toLowerCase().replace(" ", "-")
  } else if(slug) {
    calendarUrl += slug.slice(0, -1)
  } else {
    calendarUrl += "events"
  }
  return calendarUrl + ".ics"
}

function getCalendarTitle(tag, slug) {
  if(tag) {
    return tag + ' games'
  } else if(slug) {
    return 'this game'
  } else {
    return 'all games'
  }
}

const Subscribe = ({ tag, slug }) => (
  <div>
  		<p>
        <span role="img" aria-label="Spiral calendar">🗓</span> 
        <a href={ "webcal://" + getCalendarUrl(siteAddress, tag, slug) } className="ics">Subscribe to { getCalendarTitle(tag, slug) } in iOS, MacOS and Office</a>
        <small
          style={{
            display: `block`,
          }}
        >
          or 
          {` `}
          <a href="https://support.google.com/calendar/answer/37100?hl=en">Google Calendar</a>
        </small>      
      </p>
  </div>
)

export default Subscribe
