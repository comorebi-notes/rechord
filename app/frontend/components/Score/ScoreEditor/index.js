import React, { Component } from "react"
import { Editor }           from "draft-js"
import classNames           from "classnames"
import { validateTypes }    from "./validateTypes"
import { validator }        from "../../../validator"
import FormWithValidate     from "../../../validator/FormWithValidate"

import { setCurrentScrollPosition, changeScrollPosition } from "./changeScrollPosition"

export default class ScoreEditor extends Component {
  constructor() {
    super()
    this.state = { touch: false }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.touch && nextProps.editorState !== this.props.editorState) {
      this.validate(nextProps.editorState)
    }
  }
  componentDidUpdate() {
    changeScrollPosition()
  }
  validate = (editorState) => {
    if (this.props.errors) {
      validator({
        key:      "content",
        types:    validateTypes,
        setState: this.props.handleSetState,
        errors:   this.props.errors,
        value:    editorState.getCurrentContent().getPlainText()
      })
    }
  }
  handleTouch = () => {
    if (!this.state.touch) {
      this.setState({ touch: true })
      this.validate(this.props.editorState)
    }
  }
  handleChange = (editorState) => {
    const { handleChangeEditorState } = this.props
    setCurrentScrollPosition()
    handleChangeEditorState(editorState)
  }
  render() {
    const { errors, editorState, readOnly } = this.props
    const placeholder = "D6(9) | Aadd9 | E | F#m7(11)"
    const textAreaClass = classNames("textarea", "score", { "read-only": readOnly })
    return (
      <FormWithValidate errorKey="content" errors={errors}>
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
