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
    this.handleChange(this.props.editorState)
  }
  handleChange = (editorState) => {
    const { errors, handleSetState, handleChangeEditorState } = this.props
    setCurrentScrollPosition()
    handleChangeEditorState(editorState)
    validator({
      key:      "score",
      types:    ["tooLongScore"],
      value:    editorState.getCurrentContent().getPlainText(),
      setState: handleSetState,
      errors
    })
  }
  render() {
    const { touch } = this.state
    const { errors, editorState, readOnly } = this.props
    const placeholder = "D6(9) | Aadd9 | E | F#m7(11)"
    const textAreaClass = classNames("textarea", "score", { "read-only": readOnly })
    return (
      <FormWithValidate errors={errors.score} touch={touch}>
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
