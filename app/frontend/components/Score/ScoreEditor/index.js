import React, { Component } from "react"
import { Editor }           from "draft-js"
import classNames           from "classnames"
import { validator }        from "../../../validator"
import FormWithValidate     from "../../../validator/FormWithValidate"

import { setCurrentScrollPosition, changeScrollPosition } from "./changeScrollPosition"

export default class ScoreEditor extends Component {
  constructor() {
    super()
    this.state = { touch: false }
  }
  componentDidUpdate() {
    changeScrollPosition()
  }
  validate = (editorState) => (
    validator({
      key:      "content",
      types:    [["required"], ["maxLength", 1024]],
      setState: this.props.handleSetState,
      errors:   this.props.errors,
      value:    editorState.getCurrentContent().getPlainText()
    })
  )
  handleTouch = () => {
    this.setState({ touch: true })
    this.validate(this.props.editorState)
  }
  handleChange = (editorState) => {
    const { touch } = this.state
    const { handleChangeEditorState } = this.props
    setCurrentScrollPosition()
    handleChangeEditorState(editorState)
    if (touch) this.validate(editorState)
  }
  render() {
    const { errors, editorState, readOnly } = this.props
    const placeholder = "D6(9) | Aadd9 | E | F#m7(11)"
    const textAreaClass = classNames("textarea", "score", { "read-only": readOnly })
    return (
      <FormWithValidate errors={errors && errors.content}>
        <div id="score-editor" className={textAreaClass}>
          <Editor
            editorState={editorState}
            placeholder={placeholder}
            readOnly={readOnly}
            onBlur={this.handleTouch}
            onChange={this.handleChange}
          />
        </div>
      </FormWithValidate>
    )
  }
}
