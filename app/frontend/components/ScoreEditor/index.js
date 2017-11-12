import React, { Component } from "react"
import { Editor }           from "draft-js"
import classNames           from "classnames"

import { setCurrentPosition, changeScrollPosition } from "./changeScrollPosition"

export default class ScoreEditor extends Component {
  componentDidUpdate() {
    changeScrollPosition()
  }
  handleChange = (editorState) => {
    setCurrentPosition()
    this.props.handleChangeEditorState(editorState)
  }
  render() {
    const { editorState, placeholder, readOnly } = this.props
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
