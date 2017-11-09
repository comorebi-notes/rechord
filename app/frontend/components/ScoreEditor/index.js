import React, { Component }                  from "react"
import { Editor, EditorState, ContentState } from "draft-js"
import scoreDecorator                        from "../decorators/score-decorator"

export default class ScoreEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: this.setInputText(this.props.inputText)
    }
  }
  // componentWillReceiveProps({ inputText }) {
  //   if (inputText !== this.props.inputText) {
  //     this.setState({ editorState: this.setInputText(inputText) })
  //   }
  // }
  onChange = (editorState) => {
    this.setState({ editorState })
    this.props.handleChangeText(editorState.getCurrentContent().getPlainText())
  }
  setInputText = (inputText) => {
    const contentState = ContentState.createFromText(inputText)
    return EditorState.createWithContent(contentState, scoreDecorator)
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
