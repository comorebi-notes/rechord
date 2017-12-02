import React, { Component } from "react"

export default class Icon extends Component {
  render() {
    const { user: { icon_url, screen_name }, isOwn } = this.props
    return (
      <figure className="image is-square">
        {icon_url ? (
          <img
            src={icon_url}
            className="user-icon has-border"
            alt={screen_name}
          />
        ) : (
          <div className="dummy-icon" />
        )}
      </figure>
    )
  }
}
