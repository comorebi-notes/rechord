import React, { Component } from "react"
import classNames           from "classnames"
import { Editor, Modifier, EditorState, ContentState } from "draft-js"

import { validateTypes } from "./validateTypes"
import { validator }     from "../../../validator"
import FormWithValidate  from "../../../validator/FormWithValidate"
import * as regex        from "../../../constants/regex"
// import * as draftjsUtils from "../../../utils/draftjsUtils"
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
  handleBeforeInput = (chars, editorState) => {
    if (chars.match(regex.whiteSpaces)) {
      const selectionState      = editorState.getSelection()
      const anchorKey           = selectionState.getAnchorKey()
      const currentContent      = editorState.getCurrentContent()
      const currentContentBlock = currentContent.getBlockForKey(anchorKey)
      const currentLineText     = currentContentBlock.getText()
      const offset              = editorState.getSelection().getAnchorOffset()

      if (!regex.commentLineTop.test(currentLineText[0]) || offset === 0) return "handled"
    }
    return false
  }
  handlePastedText = (text, html, editorState) => {
    const trimmedText = text.split("\n").map((line) => (
      regex.commentLineTop.test(line[0]) ? line : line.replace(regex.whiteSpaces, "")
    )).join("\n")
    const pastedBlocks   = ContentState.createFromText(trimmedText).blockMap
    const currentContent = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const newContent     = Modifier.replaceWithFragment(currentContent, selectionState, pastedBlocks)
    const newEditorState = EditorState.push(editorState, newContent, trimmedText)
    this.handleChange(newEditorState)
    return true
  }
  render() {
    const { errors, editorState, readOnly } = this.props
    const placeholder = "C | F | G7 | C ..."
    const textAreaClass = classNames("textarea", "score", { "read-only": readOnly })
    return (
      <FormWithValidate errorKey="content" target="score" errors={errors}>
        <div id="score-editor" className={textAreaClass}>
          <Editor
            editorState={editorState}
            placeholder={placeholder}
            readOnly={readOnly}
            onBlur={!readOnly && this.handleTouch}
            onChange={!readOnly && this.handleChange}
            handleBeforeInput={!readOnly && this.handleBeforeInput}
            handlePastedText={!readOnly && this.handlePastedText}
          />
        </div>
      </FormWithValidate>
    )
  }
}
