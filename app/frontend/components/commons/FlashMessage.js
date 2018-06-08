import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class FlashMessage extends PureComponent {
  constructor() {
    super()
    this.state = { show: true }
  }
  componentWillReceiveProps() {
    this.setState({ show: true })
  }
  handleDelete = () => this.setState({ show: false })
  render() {
    const { show } = this.state
    const { flash } = this.props
    const [type, message] = flash

    const flashStyle = { display: (show ? "block" : "none") }
    const notificationClass = classNames("notification", {
      "is-success": (type === "success" || type === "notice"),
      "is-warning": type === "warning",
      "is-danger":  (type === "error" || type === "alert")
    })
    const icon = {
      success: "fa-check-circle",
      notice:  "fa-check-circle",
      warning: "fa-exclamation-circle",
      error:   "fa-exclamation-triangle",
      alert:   "fa-exclamation-triangle"
    }
    const iconClass = classNames("fa", "fa-lg", icon[type])
    return (
      <div className="container flash-message" style={flashStyle}>
        <div className={notificationClass}>
          <button className="delete" onClick={this.handleDelete} />
          <span className="icon is-medium" style={{ marginRight: ".5em" }}>
            <i className={iconClass} />
          </span>
          <span>{message}</span>
        </div>
      </div>
    )
  }
}
