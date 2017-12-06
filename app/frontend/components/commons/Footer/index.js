import React, { PureComponent } from "react"
import { Follow }               from "react-twitter-widgets"
import ShareButtons             from "../../SharedButtons"
import { location }             from "../../../utils/browser-dependencies"

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <small>
                Copyright &copy; 2017 comorebi notes All Rights Reserved.
              </small>
            </p>
            <Follow username="rechord_cc" />
            <span className="icon is-medium" style={{ color: "#fff" }}>
              <i className="fa fa-github fa-2x" />
            </span>
            <ShareButtons url={location.origin} asShow asFooter />
          </div>
        </div>
      </footer>
    )
  }
}
