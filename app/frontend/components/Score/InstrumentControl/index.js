import React, { Component } from "react"

import SelectField      from "../../shared/SelectField"
import * as instruments from "../../../constants/instruments"

export default class InstrumentControl extends Component {
  render() {
    const { instrumentType, handleChange, isPlaying } = this.props
    return (
      <SelectField icon="music" customClass="instrument-control">
        <select
          value={instrumentType}
          onChange={handleChange}
          disabled={isPlaying}
        >
          {Object.keys(instruments.types()).map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </SelectField>
    )
  }
}
