import React, { Component } from "react"
import classNames           from "classnames"
import { document }         from "../../utils/browser-dependencies"
import * as utils           from "../../utils"

export default class ShareModal extends Component {
  constructor(props) {
    super(props)
    this.state = { showCopyButton: !!document.queryCommandSupported("copy") }
  }
  hideModal = () => this.props.handleSetState({ modal: false })
  handleCopy = () => utils.copyToClipboard(utils.sharedUrl(this.props.url))

  render() {
    const { url, isActive } = this.props
    const { showCopyButton } = this.state
    const sharedUrl = utils.sharedUrl(url)
    const modalClass = classNames("modal", { "is-active": isActive })
    return (
      <div className={modalClass}>
        <div className="modal-background" role="presentation" onClick={this.hideModal} />
        <div className="modal-content">
          <div className="box">
            <h1 className="has-text-centered title is-5">
              <a id="shared-url" href={sharedUrl} target="_blank">
                {sharedUrl}
              </a>
              {showCopyButton && (
                <button className="button is-small is-info" onClick={this.handleCopy}>
                  <span className="icon">
                    <i className="fa fa-copy" />
                  </span>
                  <span>copy</span>
                </button>
              )}
            </h1>
          </div>
        </div>
        <button className="modal-close is-large" onClick={this.hideModal} />
      </div>
    )
  }
}
