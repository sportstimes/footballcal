import React from "react"
import JSONData from "../content/bbc-world-cup-data.json"

import moment from "moment"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Subscribe from "../components/subscribe"

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


const WorldCup2022 = ({
  pageContext
}) => {

  const  pageTitle  = JSONData.payload[0].body.matchData[0].tournamentMeta.tournamentName.full

  return (
  <Layout>
    <h1>{ pageTitle }</h1>
    <SEO title={pageTitle} />
    <Subscribe tag={'World Cup 2022'} />
    <table>

    {
      
      events.map((event, index) => {
        return <tr key={`content_item_${index}`}>
          <td className="datetime">
            {
            //moment(prevDay).format("ddd DD MMM") !== moment(event.startTime).format("ddd DD MMM") ? (
              <span className="day">
                {moment(event.startTime).format("ddd DD MMM")}
              </span>
            /*
            )
            : null 
            */
            }
            <time className="dtstart">
              {moment(event.startTime).format("YYYY-MM-DDTHH:mm:ssZ")}
            </time>
          </td>
          <td className="time"><span>{moment(event.startTime).format("H:mm")}</span></td>
          <td className="summary">
            {event.homeTeam + ' v ' + event.awayTeam}
          </td>
        </tr>
        
      })
      
    }
    </table>
  </Layout>
)
}
export default WorldCup2022