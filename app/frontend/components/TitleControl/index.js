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
    this.handleSetTitle(e)
  }
  handleSetTitle = (e) => {
    const { errors, handleSetState } = this.props
    handleSetState({ title: e.target.value })
    validator({
      key:      "title",
      types:    ["required", "tooLongTitle"],
      value:    e.target.value,
      setState: handleSetState,
      errors
    })
  }
  render() {
    const { touch } = this.state
    const { title, errors } = this.props
    return (
      <Field label="Title">
        <FormWithValidate errors={errors.title} touch={touch}>
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
