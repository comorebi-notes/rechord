import React, { Component } from "react"

import ScoreEditor       from "./ScoreEditor"
import UndoControl       from "./UndoControl"
import KeyControl        from "./KeyControl"
import ClearButton       from "./ClearButton"
import SetSampleButton   from "./SetSampleButton"
import InstrumentControl from "./InstrumentControl"
import BeatControl       from "./BeatControl"
import BpmControl        from "./BpmControl"
import CapoControl       from "./CapoControl"
import ClickControl      from "./ClickControl"
import VolumeControl     from "./VolumeControl"
import SoundControl      from "./SoundControl"
import { validate }      from "./validate"
import { scoreMaker }    from "../../utils/scoreMaker"
import * as decorator    from "../../decorators/scoreEditorDecorator"

export default class Score extends Component {
  constructor() {
    super()
    this.state = { score: false }
  }
  componentWillReceiveProps({ inputText, beat }) {
    if (inputText !== this.props.inputText || beat !== this.props.beat) {
      const parsedText = decorator.parseChordProgression(inputText)
      const score = beat && parsedText && scoreMaker(parsedText, beat)
      this.setState({ score })

      if (score) {
        const isValid = validate(score)
        this.setState({ isValid })
        this.props.handleSetState({ isValid })
      }
    }
  }
  handleChangeEditorState = (editorState) => {
    this.props.handleSetState({ editorState }, false)
    this.props.setInputText(editorState.getCurrentContent().getPlainText(), false)
  }

  render() {
    const {
      hideLabel, inputText, editorState, instrumentType, beat, bpm, capo, volume,
      enabledClick, isPlaying, handleSetState, setInputText, errors
    } = this.props
    const { score, isValid } = this.state

    return (
      <div className="field" style={{ paddingBottom: "1.5rem" }}>
        {!hideLabel && (
          <label className="label">Score</label>
        )}
        <div className="control">
          <div className="columns">
            <div className="column control">
              <ScoreEditor
                validate
                inputText={inputText}
                editorState={editorState}
                errors={errors}
                handleSetState={handleSetState}
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
                    setInputText={setInputText}
                    disabled={isPlaying}
                  />
                  <ClearButton
                    setInputText={setInputText}
                    disabled={isPlaying}
                  />
                  <SetSampleButton
                    setInputText={setInputText}
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
                  <CapoControl
                    capo={capo}
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
                capo={capo}
                volume={volume}
                enabledClick={enabledClick}
                score={score}
                isValid={isValid}
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
