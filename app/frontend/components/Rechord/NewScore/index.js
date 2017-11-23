import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score             from "../../Score"
import CreateControl     from "./CreateControl"
import ShareModal        from "../../ShareModal"
import RestoreModal      from "../../RestoreModal"
import Field             from "../../shared/Field"
import scoreDecorator    from "../../../decorators/scoreDecorator"
import sampleScore       from "../../../constants/sampleScore"
import { window }        from "../../../utils/browser-dependencies"
import * as utils        from "../../../utils"
import * as restoreState from "../../../utils/restoreState"
import { DEFAULT_BPM, DEFAULT_VOLUME, DEFAULT_BEAT } from "../../../constants"

export default class NewScore extends Component {
  constructor() {
    super()
    const { currentUser } = window.data
    const contentState = ContentState.createFromText(sampleScore)
    this.state = {
      inputText:         sampleScore,
      editorState:       EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:         false,
      volume:            DEFAULT_VOLUME,
      title:             "",
      enabledClick:      false,
      bpm:               DEFAULT_BPM,
      beat:              DEFAULT_BEAT,
      status:            "published",
      instrumentType:    "Piano",
      userId:            currentUser && currentUser.id,
      localStorageState: restoreState.get()
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

  handleSetTitle = (e) => this.handleSetState({ title: e.target.value })
  handleResetLocalStorage = () => {
    this.setState({ localStorageState: false })
    restoreState.remove()
  }
  handleSetState = (newState, saveLocalStorage = true) => {
    if (saveLocalStorage) restoreState.set(Object.assign({}, this.state, newState))
    this.setState(newState)
  }

  render() {
    const {
      inputText, title, editorState, beat, bpm, volume, instrumentType,
      isPlaying, enabledClick, status, userId, token, modal, localStorageState
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
          localStorageState={localStorageState}
          setInputText={this.setInputText}
          handleSetState={this.handleSetState}
          handleResetLocalStorage={this.handleResetLocalStorage}
        />
      </div>
    )
  }
}
