import React, { Component } from "react"

import HorizontalField from "../../shared/HorizontalField"

export default class ClickControl extends Component {
  handleToggleClick = (e) => {
    this.props.handleSetState({ beatClick: e.target.checked })
  }
  render() {
    const { beatClick } = this.props
    return (
      <HorizontalField label="Click" customClass="click-control">
        <input
          type="checkbox"
          id="beatClick"
          name="beatClick"
          className="switch is-rounded is-info is-medium"
          checked={beatClick}
          onChange={this.handleToggleClick}
        />
        <label htmlFor="beatClick" />
      </HorizontalField>
    )
  }
}
