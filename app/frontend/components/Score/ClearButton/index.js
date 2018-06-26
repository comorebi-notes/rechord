import React, { Component } from "react"

import Field  from "../../commons/Field"
import Button from "../../commons/Button"

export default class ClearButton extends Component {
  handleClearText = () => this.props.setInputText("")
  render() {
    const { disabled } = this.props
    return (
      <Field>
        <Button
          onClick={this.handleClearText}
          icon="trash"
          text="Clear"
          disabled={disabled}
        />
      </Field>
    )
  }
}
