import React, { PureComponent } from "react"
import * as utils               from "../../../utils"

export default class About extends PureComponent {
  componentDidMount = () => utils.setTitle()
  render() {
    return (
      <section className="section" style={{ padding: 0 }}>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Primary title
              </h1>
              <h2 className="subtitle">
                Primary subtitle
              </h2>
            </div>
          </div>
        </section>
      </section>
    )
  }
}
