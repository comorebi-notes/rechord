import React, { Component }    from "react"
import { Editor, EditorState } from "draft-js"
import scoreDecorator          from "../decorators/score-decorator"

export default class ScoreEditor extends Component {
  constructor() {
    super()
    this.state = {
      editorState: EditorState.createEmpty(scoreDecorator)
    }
  }
  onChange = (editorState) => {
    this.setState({ editorState })
  }
  render() {
    const { editorState } = this.state
    return (
      <div className="textarea score">
        <Editor
          editorState={editorState}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
