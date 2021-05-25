//import { Link } from "gatsby"
import React from "react"
import "./subscribe.css"

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
  <p className="subscribe">
    <a href={ "webcal://" + getCalendarUrl(siteAddress, tag, slug) }>
      <span role="img" aria-label="Spiral calendar">🗓</span> 
      <span>Add { getCalendarTitle(tag, slug) } to your calendar</span>
      <small>in iOS, MacOS and Office</small>      
    </a>
  </p>
)

export default Subscribe
