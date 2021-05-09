import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.css"
import logo from "../static/football-cal-128.png"

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <h1>
        <Link to="/">
          <img src={logo} alt={siteTitle} height="48" />
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
