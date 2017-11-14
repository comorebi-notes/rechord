import React, { Component } from "react"

import HorizontalField      from "../../shared/HorizontalField"
import { MIN_BPM, MAX_BPM } from "../../../constants"
import * as utils           from "../../../utils"

export default class BpmControl extends Component {
  handleChangeBpm = (e) => {
    this.props.handleSetState({ bpm: utils.valueInRange(e.target.value, MIN_BPM, MAX_BPM) })
  }
  render() {
    const { bpm } = this.props
    return (
      <HorizontalField label="BPM">
        <input
          type="number"
          min={MIN_BPM}
          max={MAX_BPM}
          className="input"
          value={bpm}
          onChange={this.handleChangeBpm}
        />
      </HorizontalField>
    )
  }
}
