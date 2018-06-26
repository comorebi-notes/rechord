import React, { Component } from "react"
import classNames           from "classnames"

export default class NotificationIcon extends Component {
  render() {
    const { notifications, handleToggleNotification, customClass } = this.props
    const navbarItemClass = classNames("navbar-item", "notification-icon", { [customClass]: customClass })

    return notifications.length > 0 ? (
      <a className={navbarItemClass} onClick={handleToggleNotification}>
        <span className="icon is-medium">
          <span className="fa-layers fa-fw">
            <i className="fa fa-bell fa-lg" />
            <span className="fa-layers-counter">{notifications.length}</span>
          </span>
        </span>
      </a>
    ) : (
      <span className={navbarItemClass} style={{ opacity: 0.5 }}>
        <span className="icon is-medium">
          <span className="fa-layers fa-fw">
            <i className="fa fa-bell fa-lg" />
          </span>
        </span>
      </span>
    )
  }
}
