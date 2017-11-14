import React, { Component } from "react"
import { EditorState, ContentState } from "draft-js"

import ScoreEditor       from "./ScoreEditor"
import UndoControl       from "./UndoControl"
import KeyControl        from "./KeyControl"
import InstrumentControl from "./InstrumentControl"
import TimeControl       from "./TimeControl"
import BpmControl        from "./BpmControl"
import ClickControl      from "./ClickControl"
import VolumeControl     from "./VolumeControl"
import SoundControl      from "./SoundControl"
import Field             from "../shared/Field"
import Button            from "../shared/Button"
import * as utils        from "../../utils"
import sampleScore       from "../../constants/sampleScore"
import { MIN_BPM, MAX_BPM, MIN_VOLUME, MAX_VOLUME } from "../../constants"

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
  handleKeyChange = (operation) => {
    this.setInputText(utils.keyChange(this.props.inputText, operation))
  }
  handleChangeBpm = (e) => {
    this.props.handleSetState({ bpm: utils.valueInRange(e.target.value, MIN_BPM, MAX_BPM) })
  }
  handleChangeVolume = (e) => {
    this.props.handleSetState({ volume: utils.valueInRange(e.target.value, MIN_VOLUME, MAX_VOLUME) })
  }
  handleChangeText     = (text) => this.setInputText(text, false)
  handleClearText          = () => this.setInputText("")
  handleSetSample          = () => this.setInputText(sampleScore)
  handleChangePlaying = (state) => this.props.handleSetState({ isPlaying: state })
  handleToggleClick       = (e) => this.props.handleSetState({ beatClick: e.target.checked })
  handleChangeInstrument  = (e) => this.props.handleSetState({ instrumentType: e.target.value })
  handleChangeTime        = (e) => this.props.handleSetState({ time: e.target.value })
  render() {
    const {
      inputText, editorState, instrumentType,
      time, bpm, volume, beatClick, isPlaying
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
                    handleKeyChange={this.handleKeyChange}
                    isPlaying={isPlaying}
                  />
                  <Field>
                    <Button
                      onClick={this.handleClearText}
                      icon="trash"
                      text="clear"
                      disabled={isPlaying}
                    />
                  </Field>
                  <Field>
                    <Button
                      onClick={this.handleSetSample}
                      icon="tasks"
                      text="sample"
                      disabled={isPlaying}
                    />
                  </Field>
                </div>

                <div className="column">
                  <InstrumentControl
                    instrumentType={instrumentType}
                    handleChange={this.handleChangeInstrument}
                    isPlaying={isPlaying}
                  />
                  <TimeControl
                    time={time}
                    handleChange={this.handleChangeTime}
                    isPlaying={isPlaying}
                  />
                  <BpmControl
                    bpm={bpm}
                    handleChange={this.handleChangeBpm}
                  />
                  <ClickControl
                    beatClick={beatClick}
                    handleChange={this.handleToggleClick}
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
                onChangePlaying={this.handleChangePlaying}
              />
              <VolumeControl
                volume={volume}
                handleChange={this.handleChangeVolume}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
