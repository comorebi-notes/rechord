import React, { Component } from "react"

import HorizontalField from "../../shared/HorizontalField"

export default class ClickControl extends Component {
  render() {
    const { beatClick, handleChange } = this.props
    return (
      <HorizontalField label="Click" customClass="click-control">
        <input
          type="checkbox"
          id="beatClick"
          name="beatClick"
          className="switch is-rounded is-info is-medium"
          checked={beatClick}
          onChange={handleChange}
        />
        <label htmlFor="beatClick" />
      </HorizontalField>
    )
  }
}
