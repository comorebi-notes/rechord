import React, { Component } from "react"
import SelectField          from "../../commons/SelectField"
import * as utils           from "../cardsListUtils"

export default class SortSelect extends Component {
  handleChange = (e) => this.props.handleChangeOption("sort", e.target.value)
  render() {
    const { sort, type } = this.props
    return (
      <SelectField icon="list">
        <select value={sort} onChange={this.handleChange}>
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
