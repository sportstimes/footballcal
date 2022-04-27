import React from "react"
import JSONData from "../content/bbc-world-cup-data.json"

const events = Object.values(JSONData.payload[0].body.matchData[0].tournamentDatesWithEvents).flatMap(event => event.map(subEvent => subEvent.events)).flatMap(event => event).map(event => (
  {
      startTime: event.startTime, 
      homeTeam: event.homeTeam.name.full, 
      awayTeam: event.awayTeam.name.full, 
      venue: event.venue.name.full
  }
))
/*
.reduce((acc, event) => {
  const date = event.startTime.split("T")[0];
  if (date in acc) {
      acc[date].push(event)
  } else {
      acc[date] = [event];
  }
  return acc;
}, {})
*/


const WorldCup2022 = () => (

  <div>
    <h1>{ JSONData.payload[0].body.matchData[0].tournamentMeta.tournamentName.full}</h1>
    <ol>

    {
      
      events.map((event, index) => {
        return <li key={`content_item_${index}`}>{event.homeTeam + ' v ' + event.awayTeam}</li>
        
      })
      
    }
    </ol>
  </div>
)
export default WorldCup2022