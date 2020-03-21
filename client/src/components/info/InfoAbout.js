import React from "react"
import { Translate } from "react-localize-redux"

// IMPORT COMPONENT
import Head from "../common/Head"

class InfoAbout extends React.Component {
  renderAbout() {
    return [1, 2, 3, 4, 5].map((title, index) => (
      <article className="paragraphs" key={index}>
        <h2 className="titles">
          <Translate id={`info.about.titles.${title}`} />
        </h2>
        <p key={index}>
          <Translate id={`info.about.paragraphs.${title}`} />
        </p>
      </article>
    ))
  }
  render() {
    return (
      <div className="container about-layout">
        <Head component="about" />
        <section className="about-title">
          <h1>
            <Translate id="info.about.title" />
          </h1>
        </section>
        <section className="about">{this.renderAbout()}</section>
      </div>
    )
  }
}

export default InfoAbout
