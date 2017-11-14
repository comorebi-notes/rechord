import React, { Component } from "react"

import HorizontalField      from "../../shared/HorizontalField"
import { MIN_BPM, MAX_BPM } from "../../../constants"

export default class BpmControl extends Component {
  render() {
    const { bpm, handleChange } = this.props
    return (
      <HorizontalField label="BPM">
        <input
          type="number"
          min={MIN_BPM}
          max={MAX_BPM}
          className="input"
          value={bpm}
          onChange={handleChange}
        />
      </HorizontalField>
    )
  }
}
