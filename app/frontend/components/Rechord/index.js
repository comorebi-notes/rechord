import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score          from "../Score"
import SaveControl    from "../SaveControl"
import ShareModal     from "../ShareModal"
import RestoreModal   from "../RestoreModal"
import Field          from "../shared/Field"
import scoreDecorator from "../../decorators/score-decorator"
import sampleScore    from "../../constants/sampleScore"
import { window, localStorage } from "../../utils/browser-dependencies"
import { DEFAULT_BPM, DEFAULT_VOLUME, DEFAULT_BEAT } from "../../constants"

export default class Rechord extends Component {
  constructor() {
    super()
    const { score } = window.data
    const scoreContent = score.content || sampleScore
    const contentState = ContentState.createFromText(scoreContent)
    this.state = {
      inputText:      scoreContent,
      editorState:    EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:      false,
      title:          score.title || "",
      enabledClick:   score.click || false,
      bpm:            score.bpm || DEFAULT_BPM,
      volume:         score.volume || DEFAULT_VOLUME,
      beat:           score.beat || DEFAULT_BEAT,
      instrumentType: score.instrument || "Piano"
    }

    if (Object.keys(score).length === 0 && localStorage) {
      const localStorageState = localStorage.getItem("rechordState")
      if (localStorage) {
        this.state.localStorageState = JSON.parse(localStorageState)
      }
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

  handleSetTitle = (e) => this.handleSetState({ title: e.target.value })
  handleResetLocalStorage = () => {
    this.setState({ localStorageState: false })
    localStorage.removeItem("rechordState")
  }
  handleSetState = (newState, saveLocalStorage = true) => {
    if (saveLocalStorage && localStorage) {
      const { title, inputText, enabledClick, bpm, volume, beat, instrumentType } = this.state
      const oldState = { title, inputText, enabledClick, bpm, volume, beat, instrumentType }
      localStorage.setItem("rechordState", JSON.stringify(Object.assign(oldState, newState)))
    }
    this.setState(newState)
  }

  render() {
    const {
      inputText, title, editorState, beat, bpm, volume, instrumentType,
      isPlaying, enabledClick, url, modal, localStorageState
    } = this.state
    return (
      <div>
        <Field label="Title">
          <input
            className="input"
            type="text"
            placeholder="title"
            value={title}
            onChange={this.handleSetTitle}
          />
        </Field>
        <Score
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
        <SaveControl
          title={title}
          content={inputText}
          instrument={instrumentType}
          beat={beat}
          bpm={bpm}
          click={enabledClick}
          url={url}
          handleSetState={this.handleSetState}
        />
        <ShareModal
          url={url}
          title={title}
          isActive={modal}
          handleSetState={this.handleSetState}
        />
        <RestoreModal
          localStorageState={localStorageState}
          setInputText={this.setInputText}
          handleSetState={this.handleSetState}
          handleResetLocalStorage={this.handleResetLocalStorage}
        />
      </div>
    )
  }
}
