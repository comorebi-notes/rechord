import React, { Component } from "react"

import HorizontalField from "../../commons/HorizontalField"
import SelectField     from "../../commons/SelectField"
import { beats }       from "../../../constants/beats"

export default class BeatControl extends Component {
  handleChangeBeat = (e) => {
    this.props.handleSetState({ beat: e.target.value })
  }
  render() {
    const { beat, disabled } = this.props
    return (
      <HorizontalField label="beat">
        <SelectField customClass="beat-control">
          <select
            value={beat}
            onChange={this.handleChangeBeat}
            disabled={disabled}
          >
            {Object.keys(beats).map(beatKey => (
              <option key={beatKey} value={beatKey}>
                {beatKey}
              </option>
            ))}
          </select>
        </SelectField>
      </HorizontalField>
    )
  }
}
