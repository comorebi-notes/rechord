import React, { Component } from "react"

export default class OptionCheckbox extends Component {
  handleChange = () => {
    const { option: { key }, value } = this.props
    this.props.handleChangeOption(key, !(value === "true"))
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
          checked={value === "true"}
          onChange={this.handleChange}
        />
        <label htmlFor={name}>
          {label}
        </label>
      </span>
    )
  }
}
