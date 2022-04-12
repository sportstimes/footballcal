import React from "react"
import JSONData from "../content/bbc-world-cup-data.json"

const fixtures = Object.entries(JSONData.payload[0].body.matchData[0].tournamentDatesWithEvents);

const WorldCup2022 = () => (

  <div>
    <h1>{ JSONData.payload[0].body.matchData[0].tournamentMeta.tournamentName.full }</h1>
    <ol>
    {
      fixtures.map((data, index) => {
        return <li key={`content_item_${index}`}>{data.events}</li>
      })
    }
    </ol>
  </div>
)
export default WorldCup2022