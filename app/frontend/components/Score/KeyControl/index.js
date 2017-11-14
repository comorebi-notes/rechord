import React, { Component } from "react"

import HasAddonsField from "../../shared/HasAddonsField"
import Button         from "../../shared/Button"
import * as utils     from "../../../utils"

export default class KeyControl extends Component {
  handleKeyChange = (operation) => {
    const { inputText, setInputText } = this.props
    setInputText(utils.keyChange(inputText, operation))
  }
  handleKeyUp   = () => this.handleKeyChange("up")
  handleKeyDown = () => this.handleKeyChange("down")

  render() {
    const { isPlaying } = this.props
    return (
      <HasAddonsField customClass="key-control">
        <div className="control">
          <Button
            onClick={this.handleKeyUp}
            text="#"
            disabled={isPlaying}
          />
        </div>
        <div className="control">
          <Button
            onClick={this.handleKeyDown}
            text="b"
            disabled={isPlaying}
          />
        </div>
      </HasAddonsField>
    )
  }
}
