import React, { Component } from "react"
import SelectField          from "../../../commons/SelectField"
import * as utils           from "../cardsListUtils"

export default class SortSelect extends Component {
  render() {
    const { sort, type, handleChange } = this.props
    return (
      <SelectField icon="list">
        <select value={sort} onChange={handleChange}>
          {utils.sortOptions(type).map(sortOption => (
            <option value={sortOption.value} key={sortOption.value}>
              {sortOption.label}
            </option>
          ))}
        </select>
      </SelectField>
    )
  }
}
