import React, { PureComponent } from "react"
import * as utils               from "../../../utils"

export default class About extends PureComponent {
  componentDidMount = () => utils.setTitle()
  render() {
    return (
      <section className="section about" style={{ padding: 0 }}>
        <section className="hero is-primary is-large">
          <div className="hero-body background-rechord">
            <div className="container has-text-centered">
              <h1 className="title" style={{ marginBottom: "1em" }}>
                書いたコードが鳴る。
              </h1>
              <h2 className="subtitle is-6">
                rechord は実際に演奏もできる<br className="is-hidden-tablet" />
                コード進行共有サービスです。
              </h2>
            </div>
          </div>
        </section>
      </section>
    )
  }
}
