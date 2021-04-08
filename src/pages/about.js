import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h2 id="Mission">Providing sports event data in open formats for easier consumption</h2>
    <ul id="Goals">
      <li><span role="img" aria-label="Scales">⚖️</span> Democratise sports event data</li>
      <li><span role="img" aria-label="Scroll">📜</span> Establish reusable relevant standards</li>
      <li><span role="img" aria-label="Toolbox">🧰</span> Create applications for easy distribution of sports events</li>
      <li><span role="img" aria-label="Silhouette heads">👥</span> Build a community of evangelists</li>      
    </ul>
    <h2 id="What">What is this?</h2>
    <p>Football Cal is a platform for providing football fixture dates, times &amp; locations using standards that most tech platforms understand.</p>
    <dl>
      <dt><span role="img" aria-label="Calendar">📆️</span> ICS</dt>
      <dd>Calendar feeds directly into macOS, iOS, Google Android, Microsoft Windows &amp; Office</dd>
      <dt><span role="img" aria-label="Satellite">📡</span> RSS</dt>
      <dd>Really Simple Syndication for content aggregators, online and native apps</dd>
      <dt><span role="img" aria-label="Document">📄</span> CSV</dt>
      <dd>Comma-separated content for personal use in the likes of Excel</dd>
    </dl>
  </Layout>
)

export default AboutPage