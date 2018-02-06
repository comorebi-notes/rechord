import React, { Component } from "react"
import classNames           from "classnames"

export default class Modal extends Component {
  render() {
    const {
      isActive, title, icon, children, hasButtons, yesButtonLabel, noButtonLabel, handleClick, hideModal
    } = this.props
    const modalClass = classNames("modal", { "is-active": isActive })
    const iconClass = classNames("fa", `fa-${icon}`)
    return (
      <div className={modalClass}>
        <div className="modal-background" role="presentation" onClick={hideModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <span className="icon">
                <i className={iconClass} />
              </span>
              <span>{title}</span>
            </p>
            <button className="delete" onClick={hideModal} />
          </header>
          <section className="modal-card-body">
            {children}
          </section>
          {hasButtons && (
            <footer className="modal-card-foot right">
              <button className="button is-success" onClick={handleClick}>
                {yesButtonLabel || "Yes"}
              </button>
              <button className="button" onClick={hideModal}>
                {noButtonLabel || "No"}
              </button>
            </footer>
          )}
        </div>
        <button className="modal-close is-large" onClick={hideModal} />
      </div>
    )
  }
}
