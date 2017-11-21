import React, { Component } from "react"

import HasAddonsField from "../../shared/HasAddonsField"
import Button         from "../../shared/Button"
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
            onClick={this.handleKeyUp}
            text="#"
            disabled={disabled}
          />
        </div>
        <div className="control">
          <Button
            onClick={this.handleKeyDown}
            text="b"
            disabled={disabled}
          />
        </div>
      </HasAddonsField>
    )
  }
}
