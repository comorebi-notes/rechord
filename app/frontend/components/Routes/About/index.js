import React, { PureComponent } from "react"
import LinkButton               from "../../commons/LinkButton"
import Button                   from "../../commons/Button"
import LoginModal               from "../../commons/LoginModal"
import TwitterTL                from "../../commons/TwitterTL"
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

        <div className="container">
          <div className="box twitter-tl">
            <TwitterTL />
          </div>
          <hr style={{ margin: "3rem 0" }} />
        </div>

        <div className="container" style={{ margin: "2em auto", padding: "0 2em" }}>
          <article className="message">
            <div className="message-body is-size-7">
              rechord はまだまだ発展途上です。<br />
              ご要望・バグ報告等がござましたら、<br />Twitter にて、
              <a href={path.twitter("rechord_cc")} target="_blank" rel="noopener noreferrer">
                運営公式アカウント (@rechord_cc)
              </a>
              までお気軽にお寄せください。
            </div>
          </article>

          <div className="box" style={{ maxWidth: 400, margin: "0 auto" }}>
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src="/assets/images/icon_kero.jpg" alt="ケロ" className="user-icon" />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    作者: <strong>ケロ (コモレビノーツ)</strong><br />
                    <a href={path.twitter("kero_BIRUGE")} target="_blank" rel="noopener noreferrer">
                      <span className="icon">
                        <i className="fa fa-twitter" />
                      </span>
                    </a>
                    <a
                      href="m&#97;i&#108;t&#111;:&#98;&#105;&#114;u&#103;&#101;&#64;&#98;&#105;&#114;&#117;&#103;&#101;.&#99;&#111;m"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="icon">
                        <i className="fa fa-envelope" />
                      </span>
                    </a>
                    <br />
                    yorozu no mono wo tsukurikeri.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <LoginModal active={modal} hideModal={this.handleToggleModal} />
      </section>
    )
  }
}
