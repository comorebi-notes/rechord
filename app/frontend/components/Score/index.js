import React, { Component } from "react"
import { EditorState, ContentState } from "draft-js"

import ScoreEditor       from "./ScoreEditor"
import UndoControl       from "./UndoControl"
import KeyControl        from "./KeyControl"
import ClearButton       from "./ClearButton"
import SetSampleButton   from "./SetSampleButton"
import InstrumentControl from "./InstrumentControl"
import BeatControl       from "./BeatControl"
import BpmControl        from "./BpmControl"
import ClickControl      from "./ClickControl"
import VolumeControl     from "./VolumeControl"
import SoundControl      from "./SoundControl"
import * as utils        from "../../utils"

export default class Score extends Component {
  setEditorState = (inputText) => {
    const contentState = ContentState.createFromText(inputText)
    return EditorState.push(this.props.editorState, contentState)
  }
  setInputText = (nextInputText, setEditorState = true) => {
    this.props.handleSetState({ inputText: nextInputText })
    if (setEditorState) {
      this.props.handleSetState({ editorState: this.setEditorState(nextInputText) })
    }
  }
  handleChangeEditorState = (editorState) => {
    this.props.handleSetState({ editorState })
    this.setInputText(editorState.getCurrentContent().getPlainText(), false)
  }
  render() {
    const {
      inputText, editorState, instrumentType,
      beat, bpm, volume, enabledClick, isPlaying, handleSetState
    } = this.props
    const parsedText = utils.parseChordProgression(inputText)

    return (
      <div className="field">
        <label className="label">Score</label>
        <div className="control">
          <div className="columns">
            <div className="column control">
              <ScoreEditor
                inputText={inputText}
                editorState={editorState}
                handleChangeEditorState={this.handleChangeEditorState}
                readOnly={isPlaying}
              />
            </div>

            <div className="column control-ui">
              <div className="columns">
                <div className="column editor-control">
                  <UndoControl
                    editorState={editorState}
                    handleChangeEditorState={this.handleChangeEditorState}
                    disabled={isPlaying}
                  />
                  <KeyControl
                    inputText={inputText}
                    setInputText={this.setInputText}
                    disabled={isPlaying}
                  />
                  <ClearButton
                    setInputText={this.setInputText}
                    disabled={isPlaying}
                  />
                  <SetSampleButton
                    setInputText={this.setInputText}
                    disabled={isPlaying}
                  />
                </div>

                <div className="column">
                  <InstrumentControl
                    instrumentType={instrumentType}
                    handleSetState={handleSetState}
                    disabled={isPlaying}
                  />
                  <BeatControl
                    beat={beat}
                    handleSetState={handleSetState}
                    disabled={isPlaying}
                  />
                  <BpmControl
                    bpm={bpm}
                    handleSetState={handleSetState}
                  />
                  <ClickControl
                    enabledClick={enabledClick}
                    handleSetState={handleSetState}
                  />
                </div>
              </div>
              <SoundControl
                instrumentType={instrumentType}
                beat={beat}
                bpm={bpm}
                volume={volume}
                enabledClick={enabledClick}
                parsedText={parsedText}
                isPlaying={isPlaying}
                handleSetState={handleSetState}
              />
              <VolumeControl
                volume={volume}
                handleSetState={handleSetState}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
