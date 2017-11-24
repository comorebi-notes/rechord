import React, { Component } from "react"
import Field                from "../shared/Field"
import { validator }        from "../../validator"
import FormWithValidate     from "../../validator/FormWithValidate"

export default class TitleControl extends Component {
  constructor() {
    super()
    this.state = { touch: false }
  }
  handleTouch = (e) => {
    this.setState({ touch: true })
    this.handleSetTitle(e, true)
  }
  handleSetTitle = (e, touch = false) => {
    const { errors, handleSetState } = this.props
    const isTouched = touch || this.state.touch
    handleSetState({ title: e.target.value })
    if (isTouched) {
      validator({
        key:      "title",
        types:    [["required"], ["maxLength", 40]],
        value:    e.target.value,
        setState: handleSetState,
        errors
      })
    }
  }
  render() {
    const { title, errors } = this.props
    return (
      <Field label="Title">
        <FormWithValidate errors={errors.title}>
          <input
            className="input"
            type="text"
            placeholder="title"
            value={title}
            onBlur={this.handleTouch}
            onChange={this.handleSetTitle}
          />
        </FormWithValidate>
      </Field>
    )
  }
}
