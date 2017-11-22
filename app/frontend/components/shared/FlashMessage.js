import React, { PureComponent } from "react"

export default class FlashMessage extends PureComponent {
  render() {
    const { flash } = this.props
    return (
      <div className="container" style={{ marginTop: "2em" }}>
        <div className="notification is-success">
          <span className="icon is-medium" style={{ verticalAlign: "middle" }}>
            <i className="fa fa-lg fa-check-circle" />
          </span>
          <span style={{ verticalAlign: "middle" }}>
            {flash}
          </span>
        </div>
      </div>
    )
  }
}
