import React, { PureComponent } from "react"
import LinkButton               from "../../commons/LinkButton"
import Button                   from "../../commons/Button"
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
      <section className="section about">
        <section className="hero is-primary is-fullheight">
          <div className="hero-body background-rechord">
            <div className="container has-text-centered">
              <h1 className="title">
                <img src="assets/images/logo_white.png" alt="rechord" width="180" />
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
                <Button
                  text="login / register"
                  color="primary"
                  size="medium"
                  icon="sign-in"
                  onClick={this.handleToggleModal}
                />
              </div>
              <p className="hero-icons">
                <a href="https://github.com/kero-uzura/rechord" target="_blank" rel="noopener noreferrer">
                  <span className="icon is-medium" style={{ color: "#fff" }}>
                    <i className="fa fa-github fa-2x" />
                  </span>
                </a>
                <a href="https://twitter.com/rechord_cc" target="_blank" rel="noopener noreferrer">
                  <span className="icon is-medium">
                    <span className="fa-stack">
                      <i className="fa fa-circle fa-stack-2x" />
                      <i className="fa fa-stack-1x fa-inverse fa-twitter fa-lg" style={{ color: "#111" }} />
                    </span>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </section>
        <LoginModal active={modal} hideModal={this.handleToggleModal} />
      </section>
    )
  }
}
