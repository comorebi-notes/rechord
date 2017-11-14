import React, { Component } from "react"

import Field  from "../../shared/Field"
import Button from "../../shared/Button"

export default class ClearButton extends Component {
  handleClearText = () => this.props.setInputText("")
  render() {
    const { disabled } = this.props
    return (
      <Field>
        <Button
          onClick={this.handleClearText}
          icon="trash"
          text="clear"
          disabled={disabled}
        />
      </Field>
    )
  }
}
