import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Field                   from "../shared/Field"
import HasAddonsField          from "../shared/HasAddonsField"
import HorizontalField         from "../shared/HorizontalField"
import SelectField             from "../shared/SelectField"
import Button                  from "../shared/Button"
import Slider                  from "../shared/Slider"
import ScoreEditor             from "../ScoreEditor"
import SoundControl            from "../SoundControl"
import scoreDecorator          from "../decorators/score-decorator"
import * as utils              from "../../utils"
import * as instruments        from "../../constants/instruments"
import { times }               from "../../constants/times"
import sampleChordProgression  from "../../constants/sampleChordProgression"
import {
  MIN_BPM, MAX_BPM, MIN_VOLUME, MAX_VOLUME,
  DEFAULT_BPM, DEFAULT_VOLUME, DEFAULT_TIME
} from "../../constants"

export default class App extends Component {
  constructor() {
    super()
    const contentState = ContentState.createFromText(sampleChordProgression)
    this.state = {
      inputText:   sampleChordProgression,
      editorState: EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:   false,
      beatClick:   false,
      bpm:         DEFAULT_BPM,
      volume:      DEFAULT_VOLUME,
      time:        DEFAULT_TIME,
      instrument:  "Piano"
    }
  }
  setInputText = (nextInputText, setEditorState = true) => {
    this.setState({ inputText: nextInputText })
    if (setEditorState) {
      this.setState({ editorState: this.setEditorState(nextInputText) })
    }
  }
  setEditorState = (inputText) => {
    const contentState = ContentState.createFromText(inputText)
    return EditorState.push(this.state.editorState, contentState)
  }
  handleChangeEditorState = (editorState) => {
    this.setState({ editorState })
    this.handleChangeText(editorState.getCurrentContent().getPlainText())
  }
  handleUndo = () => {
    const prevEditorState = EditorState.undo(this.state.editorState)
    this.setState({
      inputText:   prevEditorState.getCurrentContent().getPlainText(),
      editorState: prevEditorState
    })
  }
  handleRedo = () => {
    const nextEditorState = EditorState.redo(this.state.editorState)
    this.setState({
      inputText:   nextEditorState.getCurrentContent().getPlainText(),
      editorState: nextEditorState
    })
  }
  handleChangeText     = (text) => this.setInputText(text, false)
  handleClearText          = () => this.setInputText("")
  handleSetSample          = () => this.setInputText(sampleChordProgression)
  handleKeyChange = (operation) => this.setInputText(utils.keyChange(this.state.inputText, operation))
  handleChangeBpm         = (e) => this.setState({ bpm: utils.valueInRange(e.target.value, MIN_BPM, MAX_BPM) })
  handleChangeVolume      = (e) => this.setState({ volume: utils.valueInRange(e.target.value, MIN_VOLUME, MAX_VOLUME) })
  handleChangePlaying = (state) => this.setState({ isPlaying: state })
  handleToggleClick       = (e) => this.setState({ beatClick: e.target.checked })
  handleChangeInstrument  = (e) => this.setState({ instrument: e.target.value })
  handleChangeTime        = (e) => this.setState({ time: e.target.value })
  render() {
    const {
      inputText, editorState,
      time, bpm, volume, instrument, isPlaying, beatClick
    } = this.state
    const parsedText = utils.parseChordProgression(inputText)
    const placeholder = ["# e.g.", "D6(9) | Aadd9 | E | F#m7(11)"].join("\n")
    return (
      <div>
        <div className="columns">
          <div className="column control">
            <ScoreEditor
              inputText={inputText}
              editorState={editorState}
              placeholder={placeholder}
              handleChangeEditorState={this.handleChangeEditorState}
            />
          </div>

          <div className="column control-ui">
            <div className="columns">
              <div className="column">
                <HasAddonsField customClass="key-control">
                  <div className="control">
                    <Button
                      onClick={this.handleUndo}
                      icon="undo"
                      disabled={editorState.getUndoStack().size === 0}
                    />
                  </div>
                  <div className="control">
                    <Button
                      onClick={this.handleRedo}
                      icon="repeat"
                      disabled={editorState.getRedoStack().size === 0}
                    />
                  </div>
                </HasAddonsField>
                <HasAddonsField customClass="key-control">
                  <div className="control">
                    <Button
                      onClick={() => this.handleKeyChange("up")}
                      text="#"
                    />
                  </div>
                  <div className="control">
                    <Button
                      onClick={() => this.handleKeyChange("down")}
                      text="b"
                    />
                  </div>
                </HasAddonsField>
                <Field>
                  <Button
                    onClick={this.handleClearText}
                    icon="trash"
                    text="clear"
                  />
                </Field>
                <Field>
                  <Button
                    onClick={this.handleSetSample}
                    icon="tasks"
                    text="sample"
                  />
                </Field>
              </div>

              <div className="column">
                <SelectField icon="music" customClass="instrument-control">
                  <select value={instrument} onChange={this.handleChangeInstrument}>
                    {Object.keys(instruments.types()).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </SelectField>
                <HorizontalField label="Time">
                  <SelectField customClass="time-control">
                    <select value={time} onChange={this.handleChangeTime}>
                      {Object.keys(times).map(timeKey => (
                        <option key={timeKey} value={timeKey}>
                          {timeKey}
                        </option>
                      ))}
                    </select>
                  </SelectField>
                </HorizontalField>
                <HorizontalField label="BPM">
                  <input
                    type="number"
                    min={MIN_BPM}
                    max={MAX_BPM}
                    className="input"
                    value={bpm}
                    onChange={this.handleChangeBpm}
                  />
                </HorizontalField>
                <HorizontalField label="Click" customClass="click-control">
                  <input
                    type="checkbox"
                    id="beatClick"
                    name="beatClick"
                    className="switch is-rounded is-info is-medium"
                    checked={beatClick}
                    onChange={this.handleToggleClick}
                  />
                  <label htmlFor="beatClick" />
                </HorizontalField>
              </div>
            </div>
            <SoundControl
              instrument={instrument}
              time={time}
              bpm={bpm}
              volume={volume}
              beatClick={beatClick}
              parsedText={parsedText}
              isPlaying={isPlaying}
              onChangePlaying={this.handleChangePlaying}
            />
            <div className="volume-control">
              <span className="icon">
                <i className="fa fa-volume-off" />
              </span>
              <Slider
                min={MIN_VOLUME}
                max={MAX_VOLUME}
                isFullwidth
                value={volume}
                onChange={this.handleChangeVolume}
              />
              <span className="icon">
                <i className="fa fa-volume-up" />
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
