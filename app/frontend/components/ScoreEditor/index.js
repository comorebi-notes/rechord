import React, { Component } from "react"
import { Editor }           from "draft-js"

export default class ScoreEditor extends Component {
  handleChange = (editorState) => {
    this.props.handleChangeEditorState(editorState)
  }
  render() {
    const { editorState, placeholder } = this.props
    return (
      <div className="textarea score">
        <Editor
          editorState={editorState}
          placeholder={placeholder}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
