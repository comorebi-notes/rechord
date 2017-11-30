import React, { Component } from "react"
import classNames           from "classnames"

import * as path  from "../../../../utils/path"

export default class LoginModal extends Component {
  render() {
    const { active, hideModal } = this.props
    const modalClass = classNames("modal", "login", { "is-active": active })
    const renderButton = (service, label) => (
      <a
        key={service}
        href={path.auth[service]}
        className={classNames("button", "is-info", "is-medium", service)}
      >
        <span className="icon">
          <i className={classNames("fa", `fa-${service}`)} />
        </span>
        <span>{label}</span>
      </a>
    )
    return (
      <div className={modalClass}>
        <div className="modal-background" role="presentation" onClick={hideModal} />
        <div className="modal-content">
          <div className="box">
            <h1 className="has-text-centered title is-4">
              login or register
            </h1>
            {renderButton("twitter", "Twitter")}
            {renderButton("facebook", "Facebook")}
            {renderButton("google", "Google")}
            {renderButton("tumblr", "tumblr")}
            {renderButton("github", "GitHub")}
          </div>
        </div>
        <a className="modal-close is-large" role="presentation" onClick={hideModal} />
      </div>
    )
  }
}
