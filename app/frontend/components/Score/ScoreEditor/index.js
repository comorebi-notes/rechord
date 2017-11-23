import React, { Component } from "react"
import { Editor }           from "draft-js"
import classNames           from "classnames"

import { setCurrentScrollPosition, changeScrollPosition } from "./changeScrollPosition"

export default class ScoreEditor extends Component {
  componentDidUpdate() {
    changeScrollPosition()
  }
  handleChange = (editorState) => {
    setCurrentScrollPosition()
    this.props.handleChangeEditorState(editorState)
  }
  render() {
    const { editorState, readOnly } = this.props
    const placeholder = "D6(9) | Aadd9 | E | F#m7(11)"
    const textAreaClass = classNames("textarea", "score", { "read-only": readOnly })
    return (
      <div id="score-editor" className={textAreaClass}>
        <Editor
          editorState={editorState}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
