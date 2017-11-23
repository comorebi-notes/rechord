import React, { PureComponent } from "react"

export default class FlashMessage extends PureComponent {
  render() {
    const { flash } = this.props
    return (
      <div className="container flash-message">
        <div className="notification is-success">
          <span className="icon is-medium">
            <i className="fa fa-lg fa-check-circle" />
          </span>
          <span>{flash}</span>
        </div>
      </div>
    )
  }
}
