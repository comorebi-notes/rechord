import React, { Component } from "react"
import { EditorState }      from "draft-js"

import HasAddonsField from "../../shared/HasAddonsField"
import Button         from "../../shared/Button"

export default class UndoControl extends Component {
  handleUndo = () => {
    const prevEditorState = EditorState.undo(this.props.editorState)
    this.props.handleChangeEditorState(prevEditorState)
  }
  handleRedo = () => {
    const nextEditorState = EditorState.redo(this.props.editorState)
    this.props.handleChangeEditorState(nextEditorState)
  }
  render() {
    const { editorState, isPlaying } = this.props
    return (
      <HasAddonsField customClass="undo-control">
        <div className="control">
          <Button
            onClick={this.handleUndo}
            icon="undo"
            disabled={isPlaying || editorState.getUndoStack().size === 0}
          />
        </div>
        <div className="control">
          <Button
            onClick={this.handleRedo}
            icon="repeat"
            disabled={isPlaying || editorState.getRedoStack().size === 0}
          />
        </div>
      </HasAddonsField>
    )
  }
}
