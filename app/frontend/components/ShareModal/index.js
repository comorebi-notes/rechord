import React, { Component } from "react"
import classNames           from "classnames"
import * as utils           from "../../utils"

export default class ShareModal extends Component {
  hideModal = () => (
    this.props.handleSetState({ modal: false })
  )
  render() {
    const { url, isActive } = this.props
    const sharedUrl = utils.sharedUrl(url)
    const modalClass = classNames("modal", { "is-active": isActive })
    return (
      <div className={modalClass}>
        <div className="modal-background" role="presentation" onClick={this.hideModal} />
        <div className="modal-content">
          <div className="box">
            <h1 className="has-text-centered title is-5">
              <a href={sharedUrl} target="_blank">
                {sharedUrl}
              </a>
            </h1>
          </div>
        </div>
        <button className="modal-close is-large" onClick={this.hideModal} />
      </div>
    )
  }
}
