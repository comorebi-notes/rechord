import React, { PureComponent } from "react"
import LinkButton               from "../../commons/LinkButton"
import LoginModal               from "../../commons/Header/LoginModal"
import * as path                from "../../../utils/path"
import * as utils               from "../../../utils"

export default class About extends PureComponent {
  constructor() {
    super()
    this.state = { modal: false }
  }
  componentDidMount = () => utils.setTitle()
  handleToggleModal = () => this.setState({ modal: !this.state.modal })
  render() {
    const { modal } = this.state
    return (
      <section className="section about" style={{ padding: 0 }}>
        <section className="hero is-primary is-large">

          <div className="hero-body background-rechord">
            <div className="container has-text-centered">
              <h1 className="title" style={{ marginBottom: "1em" }}>
                easy to play, <br className="is-hidden-tablet" />
                easy to share !
              </h1>
              <h2 className="subtitle is-6">
                rechord は実際に演奏もできる<br className="is-hidden-tablet" />
                コード進行共有サービスです。
              </h2>
              <div className="hero-buttons">
                <LinkButton
                  to={path.root}
                  text="create score"
                  icon="play"
                  color="info"
                  size="medium"
                />
                <button className="button is-primary is-medium" onClick={this.handleToggleModal}>
                  <span className="icon is-small">
                    <i className="fa fa-sign-in" />
                  </span>
                  <span>login or register</span>
                </button>
              </div>
            </div>
          </div>

        </section>
        <LoginModal active={modal} hideModal={this.handleToggleModal} />
      </section>
    )
  }
}
