import React, { Component } from "react"

import HasAddonsField from "../../commons/HasAddonsField"
import Button         from "../../commons/Button"
import * as decorator from "../../../decorators/scoreEditorDecorator"

export default class KeyControl extends Component {
  handleKeyChange = (operation) => {
    const { inputText, setInputText } = this.props
    setInputText(decorator.keyChange(inputText, operation))
  }
  handleKeyUp   = () => this.handleKeyChange("up")
  handleKeyDown = () => this.handleKeyChange("down")

  render() {
    const { disabled } = this.props
    return (
      <HasAddonsField customClass="key-control">
        <div className="control">
          <Button
            rightIcon
            onClick={this.handleKeyDown}
            icon="arrow-down"
            text="key"
            disabled={disabled}
          />
        </div>
        <div className="control">
          <Button
            rightIcon
            onClick={this.handleKeyUp}
            icon="arrow-up"
            text="key"
            disabled={disabled}
          />
        </div>
      </HasAddonsField>
    )
  }
}
