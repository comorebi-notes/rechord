import React, { Component } from "react"
import ReleaseNotification  from "./ReleaseNotification"
import FavNotification      from "./FavNotification"
import DefaultNotification  from "./DefaultNotification"
import ModalCard            from "../ModalCard"

export default class Notification extends Component {
  render() {
    const { notifications, isActive, handleToggleNotification, handleClearNotification } = this.props
    const notificationTemplate = (notification) => {
      const params = { data: notification, key: notification.title, handleToggleNotification }
      switch (notification.template) {
        case "version": return <ReleaseNotification {...params} />
        case "fav":     return <FavNotification {...params} />
        default:        return <DefaultNotification {...params} />
      }
    }
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
        {isActive && notifications.map(notification => notificationTemplate(notification))}
      </ModalCard>
    )
  }
}
