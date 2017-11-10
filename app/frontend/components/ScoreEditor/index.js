import React, { Component } from "react"
import { Editor }           from "draft-js"
import classNames           from "classnames"

export default class ScoreEditor extends Component {
  handleChange = (editorState) => {
    this.props.handleChangeEditorState(editorState)
  }
  render() {
    const { editorState, placeholder, readOnly } = this.props
    const textAreaClass = classNames("textarea", "score", { "read-only": readOnly })
    return (
      <div className={textAreaClass}>
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
