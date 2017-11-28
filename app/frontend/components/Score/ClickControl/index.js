import React, { Component } from "react"

import HorizontalField from "../../commons/HorizontalField"

export default class ClickControl extends Component {
  handleToggleClick = (e) => {
    this.props.handleSetState({ enabledClick: e.target.checked })
  }
  render() {
    const { enabledClick } = this.props
    return (
      <HorizontalField label="Click" customClass="click-control">
        <input
          type="checkbox"
          id="enabledClick"
          name="enabledClick"
          className="switch is-rounded is-info is-medium"
          checked={enabledClick || false}
          onChange={this.handleToggleClick}
        />
        <label htmlFor="enabledClick" />
      </HorizontalField>
    )
  }
}
