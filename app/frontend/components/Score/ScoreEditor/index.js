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
  handleTouchEditor = () => {
    this.setState({ touch: true })
    this.handleChange(this.props.editorState, true)
  }
  handleChange = (editorState, touch = false) => {
    const { errors, handleSetState, handleChangeEditorState } = this.props
    const isTouched = touch || this.state.touch
    setCurrentScrollPosition()
    handleChangeEditorState(editorState)
    if (isTouched && errors) {
      validator({
        key:      "content",
        types:    [["required"], ["maxLength", 1024]],
        value:    editorState.getCurrentContent().getPlainText(),
        setState: handleSetState,
        errors
      })
    }
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
            onBlur={this.handleTouchEditor}
            onChange={this.handleChange}
          />
        </div>
      </FormWithValidate>
    )
  }
}
