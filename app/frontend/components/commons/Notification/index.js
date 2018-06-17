import React, { Component } from "react"
import ModalCard            from "../ModalCard"

export default class Notification extends Component {
  handleClearNotification = () => this.props.handleClearNotification()
  render() {
    const { notifications, active } = this.props
    return (
      <ModalCard
        isActive={active}
        title="お知らせ"
        icon="info-circle"
        hasButtons
        yesButtonOnly
        yesButtonLabel="OK"
        handleClick={this.handleClearNotification}
        hideModal={this.handleClearNotification}
      >
        {notifications.map(notification => (
          <div key={notification.title}>
            <h2>{notification.title}</h2>
            <div>{notification.content}</div>
          </div>
        ))}
      </ModalCard>
    )
  }
}
