import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score              from "../Score"
import SharedButtons      from "../SharedButtons"
import scoreDecorator     from "../../decorators/score-decorator"
import * as utils         from "../../utils"
import { window }         from "../../utils/browser-dependencies"
import { DEFAULT_VOLUME } from "../../constants"

export default class ShowRechord extends Component {
  constructor() {
    super()
    const { score } = window.data
    const scoreContent = score.content
    const contentState = ContentState.createFromText(scoreContent)
    this.state = {
      inputText:      scoreContent,
      editorState:    EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:      false,
      volume:         DEFAULT_VOLUME,
      title:          score.title,
      enabledClick:   score.click,
      bpm:            score.bpm,
      beat:           score.beat,
      instrumentType: score.instrument,
      url:            score.url
    }
  }
  setEditorState = (inputText) => {
    const contentState = ContentState.createFromText(inputText)
    return EditorState.push(this.state.editorState, contentState)
  }
  setInputText = (nextInputText, setEditorState = true) => {
    this.handleSetState({ inputText: nextInputText })
    if (setEditorState) {
      this.setState({ editorState: this.setEditorState(nextInputText) })
    }
  }

  handleSetState = (newState) => this.setState(newState)

  render() {
    const {
      inputText, title, editorState, beat, bpm, volume, instrumentType, isPlaying, enabledClick, url
    } = this.state
    return (
      <div>
        <h1 className="title">{title}</h1>
        <SharedButtons url={utils.sharedUrl(url)} title={title} asShow />
        <Score
          hideLabel
          inputText={inputText}
          editorState={editorState}
          instrumentType={instrumentType}
          beat={beat}
          bpm={bpm}
          volume={volume}
          enabledClick={enabledClick}
          isPlaying={isPlaying}
          setInputText={this.setInputText}
          handleSetState={this.handleSetState}
        />
      </div>
    )
  }
}
