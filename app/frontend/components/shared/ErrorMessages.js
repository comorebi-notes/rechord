import React, { PureComponent } from "react"

export default class ErrorMessages extends PureComponent {
  render() {
    const { error } = this.props
    return (
      <p className="has-text-danger" style={{ margin: ".5em 0 .5em 0" }}>{error}</p>
    )
  }
}
