import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import { Follow }               from "react-twitter-widgets"
import ShareButtons             from "../../SharedButtons"
import * as path                from "../../../utils/path"
import { location }             from "../../../utils/browser-dependencies"

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <ShareButtons url={location.origin} asShow asFooter />
            <Follow username="rechord_cc" />
            <p style={{ marginTop: "3em" }}>
              <Link to={path.privacyPolicy}>
                <span className="is-size-7">
                  プライバシーポリシー
                </span>
              </Link>
              <br />
              <small>
                Copyright &copy; 2017 comorebi notes All Rights Reserved.
              </small>
            </p>
          </div>
        </div>
      </footer>
    )
  }
}
