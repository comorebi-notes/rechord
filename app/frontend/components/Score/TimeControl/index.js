import React, { Component } from "react"

import HorizontalField from "../../shared/HorizontalField"
import SelectField     from "../../shared/SelectField"
import { times }       from "../../../constants/times"

export default class TimeControl extends Component {
  render() {
    const { time, handleChange, isPlaying } = this.props
    return (
      <HorizontalField label="Time">
        <SelectField customClass="time-control">
          <select
            value={time}
            onChange={handleChange}
            disabled={isPlaying}
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
