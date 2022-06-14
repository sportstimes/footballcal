//import { Link } from "gatsby"
import React from "react"
import "./subscribe.css"

function getCalendarUrl(tag, slug) {
  let calendarUrl = 'footballcal.com' // TODO: Fix to be dynamic for feature branches
   
  if(tag) {
    calendarUrl += "/" + tag.toLowerCase().replace(/ /g, "-")
  } else if(slug) {
    calendarUrl += slug.slice(0, -1)
  } else {
    calendarUrl += "/events"
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
    <a href={ "webcal://" + getCalendarUrl(tag, slug) }>
      <span role="img" aria-label="Spiral calendar">🗓</span> 
      <span>Add { getCalendarTitle(tag, slug) } to your calendar</span>
      <small>in iOS, MacOS and Office</small>      
    </a>
  </p>
)

export default Subscribe
