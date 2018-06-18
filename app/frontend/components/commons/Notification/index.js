import React, { Component } from "react"
import ModalCard            from "../ModalCard"

export default class Notification extends Component {
  render() {
    const { notifications, isActive, handleToggleNotification, handleClearNotification } = this.props
    return (
      <ModalCard
        isActive={isActive}
        title="お知らせ"
        icon="info-circle"
        hasButtons
        yesButtonOnly
        yesButtonLabel="すべて既読にする"
        handleClick={handleClearNotification}
        hideModal={handleToggleNotification}
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
