import React, { Component } from "react"
import { EditorState }      from "draft-js"

import HasAddonsField from "../../commons/HasAddonsField"
import Button         from "../../commons/Button"

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
    const { editorState, disabled } = this.props
    return (
      <HasAddonsField customClass="undo-control">
        <div className="control">
          <Button
            onClick={this.handleUndo}
            icon="undo"
            disabled={disabled || editorState.getUndoStack().size === 0}
          />
        </div>
        <div className="control">
          <Button
            onClick={this.handleRedo}
            icon="repeat"
            disabled={disabled || editorState.getRedoStack().size === 0}
          />
        </div>
      </HasAddonsField>
    )
  }
}
