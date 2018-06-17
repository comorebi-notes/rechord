import React, { Component } from "react"

export default class NotificationIcon extends Component {
  render() {
    const { notifications, handleToggleNotification } = this.props
    return notifications.length > 0 ? (
      <a className="navbar-item" onClick={handleToggleNotification} role="presentation">
        <span className="icon is-medium">
          <span className="fa-layers fa-fw">
            <i className="fa fa-bell fa-lg" />
            <span className="fa-layers-counter">{notifications.length}</span>
          </span>
        </span>
      </a>
    ) : (
      <span className="navbar-item" style={{ opacity: 0.5 }}>
        <span className="icon is-medium">
          <span className="fa-layers fa-fw">
            <i className="fa fa-bell fa-lg" />
          </span>
        </span>
      </span>
    )
  }
}
