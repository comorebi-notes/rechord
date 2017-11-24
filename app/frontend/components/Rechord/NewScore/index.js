import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score                  from "../../Score"
import TitleControl           from "../../TitleControl"
import CreateControl          from "./CreateControl"
import ShareModal             from "./ShareModal"
import RestoreModal           from "./RestoreModal"
import scoreDecorator         from "../../../decorators/scoreDecorator"
import sampleScore            from "../../../constants/sampleScore"
import { window }             from "../../../utils/browser-dependencies"
import * as utils             from "../../../utils"
import * as localStorageState from "../../../utils/localStorageState"
import { DEFAULT_BPM, DEFAULT_VOLUME, DEFAULT_BEAT } from "../../../constants"

export default class NewScore extends Component {
  constructor() {
    super()
    const { currentUser } = window.data
    let score = ""

    if (Object.keys(currentUser).length === 0 && !localStorageState.isVisited()) {
      score = sampleScore
      localStorageState.visit()
    }

    const contentState = ContentState.createFromText(score)
    this.state = {
      inputText:      sampleScore,
      editorState:    EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:      false,
      volume:         DEFAULT_VOLUME,
      title:          "",
      enabledClick:   false,
      bpm:            DEFAULT_BPM,
      beat:           DEFAULT_BEAT,
      status:         "published",
      instrumentType: "Piano",
      userId:         currentUser.id,
      restoreState:   localStorageState.get(),
      errors:         {}
    }
  }
  componentDidMount = () => utils.setTitle()

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

  handleResetLocalStorage = () => {
    this.setState({ restoreState: false })
    localStorageState.remove()
  }
  handleSetState = (newState, saveLocalStorage = true) => {
    if (saveLocalStorage) localStorageState.set(Object.assign({}, this.state, newState))
    this.setState(newState)
  }

  render() {
    const {
      inputText, title, editorState, beat, bpm, volume, instrumentType,
      isPlaying, enabledClick, status, userId, token, modal, restoreState, errors
    } = this.state
    return (
      <div>
        <TitleControl
          title={title}
          errors={errors}
          handleSetState={this.handleSetState}
        />
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
        <CreateControl
          title={title}
          content={inputText}
          instrument={instrumentType}
          beat={beat}
          bpm={bpm}
          click={enabledClick}
          status={status}
          userId={userId}
          token={token}
          handleSetState={this.handleSetState}
          handleResetLocalStorage={this.handleResetLocalStorage}
        />
        <ShareModal
          token={token}
          title={title}
          isActive={modal}
          handleSetState={this.handleSetState}
        />
        <RestoreModal
          restoreState={restoreState}
          setInputText={this.setInputText}
          handleSetState={this.handleSetState}
          handleResetLocalStorage={this.handleResetLocalStorage}
        />
      </div>
    )
  }
}
