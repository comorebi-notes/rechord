import React, { Component } from "react"
import ModalCard            from "./ModalCard"

export default class Notification extends Component {
  constructor() {
    super()
    this.state = { active: false }
  }
  componentWillReceiveProps({ notifications }) {
    this.setState({ active: notifications.length > 0 })
  }
  hideModal = () => this.setState({ active: false })
  render() {
    const { notifications } = this.props
    const { active } = this.state
    return (
      <ModalCard
        isActive={active}
        title="お知らせ"
        icon="info-circle"
        hasButtons
        yesButtonOnly
        yesButtonLabel="OK"
        handleClick={this.hideModal}
        hideModal={this.hideModal}
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
