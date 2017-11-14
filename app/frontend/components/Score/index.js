import React, { Component } from "react"
import { EditorState, ContentState } from "draft-js"

import ScoreEditor       from "./ScoreEditor"
import UndoControl       from "./UndoControl"
import KeyControl        from "./KeyControl"
import ClearButton       from "./ClearButton"
import SetSampleButton   from "./SetSampleButton"
import InstrumentControl from "./InstrumentControl"
import TimeControl       from "./TimeControl"
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
      time, bpm, volume, beatClick, isPlaying, handleSetState
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
                    isPlaying={isPlaying}
                  />
                  <KeyControl
                    inputText={inputText}
                    setInputText={this.setInputText}
                    isPlaying={isPlaying}
                  />
                  <ClearButton
                    setInputText={this.setInputText}
                    isPlaying={isPlaying}
                  />
                  <SetSampleButton
                    setInputText={this.setInputText}
                    isPlaying={isPlaying}
                  />
                </div>

                <div className="column">
                  <InstrumentControl
                    instrumentType={instrumentType}
                    handleSetState={handleSetState}
                    isPlaying={isPlaying}
                  />
                  <TimeControl
                    time={time}
                    handleSetState={handleSetState}
                    isPlaying={isPlaying}
                  />
                  <BpmControl
                    bpm={bpm}
                    handleSetState={handleSetState}
                  />
                  <ClickControl
                    beatClick={beatClick}
                    handleSetState={handleSetState}
                  />
                </div>
              </div>
              <SoundControl
                instrumentType={instrumentType}
                time={time}
                bpm={bpm}
                volume={volume}
                beatClick={beatClick}
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
