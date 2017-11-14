import React, { Component } from "react"

import HorizontalField from "../../shared/HorizontalField"
import SelectField     from "../../shared/SelectField"
import { times }       from "../../../constants/times"

export default class TimeControl extends Component {
  handleChangeTime = (e) => {
    this.props.handleSetState({ time: e.target.value })
  }
  render() {
    const { time, disabled } = this.props
    return (
      <HorizontalField label="Time">
        <SelectField customClass="time-control">
          <select
            value={time}
            onChange={this.handleChangeTime}
            disabled={disabled}
          >
            {Object.keys(times).map(timeKey => (
              <option key={timeKey} value={timeKey}>
                {timeKey}
              </option>
            ))}
          </select>
        </SelectField>
      </HorizontalField>
    )
  }
}
