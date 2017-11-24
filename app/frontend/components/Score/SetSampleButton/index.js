import React, { Component } from "react"

import Field       from "../../shared/Field"
import Button      from "../../shared/Button"
import sampleScore from "../../../constants/sampleScore"

export default class SetSampleButton extends Component {
  handleSetSample = () => {
    const { errors, setInputText, handleSetState } = this.props
    setInputText(sampleScore)
    handleSetState({ errors: Object.assign({}, errors, { content: false }) })
  }
  render() {
    const { disabled } = this.props
    return (
      <Field>
        <Button
          onClick={this.handleSetSample}
          icon="tasks"
          text="sample"
          disabled={disabled}
        />
      </Field>
    )
  }
}
