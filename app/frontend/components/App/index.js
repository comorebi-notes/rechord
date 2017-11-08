import React, { Component }    from "react"
import Field                   from "../shared/Field"
import HasAddonsField          from "../shared/HasAddonsField"
import HorizontalField         from "../shared/HorizontalField"
import SelectField             from "../shared/SelectField"
import Button                  from "../shared/button"
import Score                   from "../Score"
import SoundControl            from "../SoundControl"
import * as utils              from "../../utils"
import * as instruments        from "../../constants/instruments"
import sampleChordProgression  from "../../constants/sampleChordProgression"
import { MIN_BPM, MAX_BPM, MIN_VOLUME, MAX_VOLUME, DEFAULT_BPM, DEFAULT_VOLUME } from "../../constants"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText:  sampleChordProgression,
      undid:      false,
      isPlaying:  false,
      beatClick:  false,
      bpm:        DEFAULT_BPM,
      volume:     DEFAULT_VOLUME,
      instrument: "Piano"
    }
  }
  setInputText = (nextInputText) => {
    const { inputText, oldInputText } = this.state
    const nextOldInputText = inputText === nextInputText ? oldInputText : inputText
    this.setState({
      oldInputText: nextOldInputText,
      inputText:    nextInputText,
      undid:        false
    })
  }
  handleUndo = () => {
    const { inputText, oldInputText, undid } = this.state
    this.setState({
      inputText:    oldInputText,
      oldInputText: inputText,
      undid:        !undid
    })
  }
  handleChangeText        = (e) => this.setInputText(e.target.value)
  handleClearText          = () => this.setInputText("")
  handleSetSample          = () => this.setInputText(sampleChordProgression)
  handleKeyChange = (operation) => this.setInputText(utils.keyChange(this.state.inputText, operation))
  handleChangeBpm         = (e) => this.setState({ bpm: utils.valueInRange(e.target.value, MIN_BPM, MAX_BPM) })
  handleChangeVolume      = (e) => this.setState({ volume: utils.valueInRange(e.target.value, MIN_VOLUME, MAX_VOLUME) })
  handleChangePlaying = (state) => this.setState({ isPlaying: state })
  handleToggleClick       = (e) => this.setState({ beatClick: e.target.checked })
  handleChangeInstrument  = (e) => this.setState({ instrument: e.target.value })
  render() {
    const { inputText, oldInputText, undid, bpm, volume, instrument, isPlaying, beatClick } = this.state
    const parsedText = utils.parseChordProgression(inputText)
    const placeholder = ["# e.g.", "D6(9) | Aadd9 | E | F#m7(11)"].join("\n")
    return (
      <div>
        <div className="columns">
          <div className="column control">
            <textarea
              className="textarea chord-progression"
              placeholder={placeholder}
              value={inputText}
              onChange={this.handleChangeText}
              spellCheck="false"
            />
          </div>

          <div className="column control-ui">
            <div className="columns">
              <div className="column">
                <Field>
                  <Button
                    onClick={this.handleUndo}
                    icon={undid ? "repeat" : "undo"}
                    text={undid ? "redo" : "undo"}
                    disabled={!oldInputText}
                  />
                </Field>
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
                  <select onChange={this.handleChangeInstrument}>
                    {Object.keys(instruments.types()).map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </SelectField>
                <HorizontalField label="BPM">
                  <input
                    type="number"
                    min="60"
                    max="600"
                    className="input"
                    value={bpm}
                    onChange={this.handleChangeBpm}
                  />
                </HorizontalField>
                <HorizontalField label="Volume">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="input"
                    value={volume}
                    onChange={this.handleChangeVolume}
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
              bpm={bpm}
              volume={volume}
              instrument={instrument}
              beatClick={beatClick}
              parsedText={parsedText}
              isPlaying={isPlaying}
              onChangePlaying={this.handleChangePlaying}
            />
          </div>
        </div>

        <div className="content">
          <Score text={parsedText} />
        </div>
      </div>
    )
  }
}
