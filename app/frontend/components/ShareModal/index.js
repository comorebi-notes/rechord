import React, { Component } from "react"
import classNames           from "classnames"

import SharedButtons from "../SharedButtons"
import { document }  from "../../utils/browser-dependencies"
import * as utils    from "../../utils"

export default class ShareModal extends Component {
  constructor(props) {
    super(props)
    this.state = { showCopyButton: !!document.queryCommandSupported("copy") }
  }
  hideModal = () => this.props.handleSetState({ modal: false }, false)
  handleCopy = () => utils.copyToClipboard(utils.sharedUrl(this.props.token))

  render() {
    const { label, token, title, isActive } = this.props
    const { showCopyButton } = this.state
    const sharedUrl = utils.sharedUrl(token)
    const modalClass = classNames("modal", { "is-active": isActive })
    return (
      <div className={modalClass}>
        <div className="modal-background" onClick={this.hideModal} />
        <div className="modal-content">
          <div className="box">
            <h1 className="has-text-centered title is-4">
              {label}
            </h1>
            <h2 className="has-text-centered title is-5 shared-url">
              <a href={sharedUrl} target="_blank" rel="noopener noreferrer">
                {sharedUrl}
              </a>
              {showCopyButton && (
                <button
                  className="button is-small is-info"
                  style={{ verticalAlign: "middle" }}
                  onClick={this.handleCopy}
                >
                  <span className="icon">
                    <i className="fa fa-copy" />
                  </span>
                  <span>Copy</span>
                </button>
              )}
            </h2>
            <SharedButtons url={sharedUrl} title={title} />
          </div>
        </div>
        <button className="modal-close is-large" onClick={this.hideModal} />
      </div>
    )
  }
}
