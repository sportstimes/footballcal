import React from "react"
import { Link } from "gatsby"
import moment from "moment"

import "./event-row.css"

const EventRow = ({ post, prevDay }) => (
  <tr id={'Match' + post.id} className={ "vevent" }>
      <td className="datetime">
        {
        moment(prevDay).format("ddd DD MMM") !== moment(post.frontmatter.date).format("ddd DD MMM") ? (
          <span className="day">
            {moment(post.frontmatter.date).format("ddd DD MMM")}
          </span>
        )
        : null 
        }
        <time className="dtstart">
          {moment(post.frontmatter.date).format("YYYY-MM-DDTHH:mm:ssZ")}
        </time>
        <time className="dtend">
          {moment(post.frontmatter.date).add(110, 'minute').format("YYYY-MM-DDTHH:mm:ssZ")}
        </time>
      </td>
      <td className="time"><span>{moment(post.frontmatter.date).format("H:mm")}</span></td>
      <td className="summary">
        <Link className="url" to={post.frontmatter.path}>{post.frontmatter.title}</Link>
      </td>
  </tr>
)

export default EventRow
