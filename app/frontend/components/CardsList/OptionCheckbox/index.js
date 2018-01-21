import React, { Component } from "react"

const isChecked = (value) => value === "true" || value === true

export default class OptionCheckbox extends Component {
  handleChange = () => {
    const { option: { key }, value } = this.props
    this.props.handleChangeOption(key, !isChecked(value))
  }
  render() {
    const { option: { key, label }, value } = this.props
    const name = `${key}-checkbox`
    return (
      <span>
        <input
          className="is-checkradio is-small"
          type="checkbox"
          id={name}
          name={name}
          checked={isChecked(value)}
          onChange={this.handleChange}
        />
        <label htmlFor={name}>
          {label}
        </label>
      </span>
    )
  }
}
