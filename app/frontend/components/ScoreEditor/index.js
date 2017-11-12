import React, { Component } from "react"
import { Editor }           from "draft-js"
import classNames           from "classnames"
import { document }         from "../../utils/browser-dependencies"

let currentScrollWidth
let currentClientHeight
let isRightEnd

const changeScrollPosition = () => {
  const editor        = document.getElementById("score-editor")
  const editorContent = document.getElementsByClassName("public-DraftEditor-content")[0]

  const { scrollWidth, clientWidth, scrollLeft } = editor
  const { clientHeight }                         = editorContent.children[0]

  currentScrollWidth  = scrollWidth
  currentClientHeight = clientHeight
  isRightEnd          = scrollWidth === clientWidth + scrollLeft
}

export default class ScoreEditor extends Component {
  componentDidUpdate() {
    const editor        = document.getElementById("score-editor")
    const editorContent = document.getElementsByClassName("public-DraftEditor-content")[0]

    const { scrollWidth, clientWidth } = editor
    const { clientHeight }             = editorContent.children[0]

    if (isRightEnd && scrollWidth > clientWidth && scrollWidth > currentScrollWidth) {
      // 右端での文字入力時にエディタが overscroll したらエディタを右端にスクロール
      editor.scrollLeft = scrollWidth - clientWidth
    } else if (clientHeight !== currentClientHeight) {
      // 文字入力時に高さが変わったらエディタを左端にスクロール
      editor.scrollLeft = 0
    }
  }
  handleChange = (editorState) => {
    changeScrollPosition()
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
