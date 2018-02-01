import React, { Component } from "react"

import HorizontalField from "../../commons/HorizontalField"

export default class LoopControl extends Component {
  handleToggleLoop = (e) => {
    this.props.handleSetState({ loop: e.target.checked })
  }
  render() {
    const { loop } = this.props
    return (
      <HorizontalField customClass="loop-control">
        <input
          type="checkbox"
          id="loop"
          name="loop"
          className="switch is-rounded is-info is-large"
          checked={loop || false}
          onChange={this.handleToggleLoop}
        />
        <label htmlFor="loop" />
      </HorizontalField>
    )
  }
}
