import React, { Component } from "react"

import HasAddonsField from "../../shared/HasAddonsField"
import Button         from "../../shared/Button"

export default class KeyControl extends Component {
  handleKeyUp   = () => this.props.handleKeyChange("up")
  handleKeyDown = () => this.props.handleKeyChange("down")
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
