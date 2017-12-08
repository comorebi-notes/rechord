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
            <Follow username="rechord_cc" />
            <ShareButtons url={location.origin} asShow asFooter />
            <p>
              <Link to={path.privacyPolicy}>
                プライバシーポリシー
              </Link>
            </p>
            <p style={{ marginTop: "3em" }}>
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
