import React, { Component }   from "react"
import Textarea               from "react-textarea-autosize"
import Button                 from "../shared/button"
import Slider                 from "../shared/slider"
import ControlField           from "../shared/controlField"
import Score                  from "../Score"
import SoundControl           from "../SoundControl"
import * as utils             from "../../utils"
import sampleChordProgression from "../../constants/sampleChordProgression"

const defaultBpm = 120
const defaultVolume = 10

export default class App extends Component {
  constructor() {
    super()
    this.handleChangeText    = this.handleChangeText.bind(this)
    this.handleChangeBpm     = this.handleChangeBpm.bind(this)
    this.handleChangeVolume  = this.handleChangeVolume.bind(this)
    this.handleClearText     = this.handleClearText.bind(this)
    this.handleSetSample     = this.handleSetSample.bind(this)
    this.handleKeyChange     = this.handleKeyChange.bind(this)
    this.handleChangePlaying = this.handleChangePlaying.bind(this)
    this.state = {
      inputText: sampleChordProgression,
      isPlaying: false,
      bpm:       defaultBpm,
      volume:    defaultVolume
    }
  }
  handleChangeText(e) {
    this.setState({ inputText: e.target.value })
  }
  handleChangeBpm(e) {
    this.setState({ bpm: e.target.value })
  }
  handleChangeVolume(e) {
    this.setState({ volume: e.target.value })
  }
  handleClearText() {
    this.setState({ inputText: "" })
  }
  handleSetSample() {
    this.setState({ inputText: sampleChordProgression })
  }
  handleKeyChange(operation) {
    this.setState({ inputText: utils.keyChange(this.state.inputText, operation) })
  }
  handleChangePlaying(state) {
    this.setState({ isPlaying: state })
  }
  render() {
    const { inputText, bpm, volume, isPlaying } = this.state
    const parsedText = utils.parseChordProgression(inputText)
    const placeholder = ["# e.g.", "D6(9) | Aadd9 | E | F#m7(11)"].join("\n")
    return (
      <div>
        <ControlField label="chord progression">
          <Textarea
            className="textarea"
            placeholder={placeholder}
            value={inputText}
            onChange={this.handleChangeText}
          />
        </ControlField>

        <div className="field is-grouped">
          <div className="control">
            <Button
              onClick={this.handleClearText}
              icon="trash"
              text="clear"
            />
          </div>
          <div className="field has-addons">
            <div className="control">
              <Button
                onClick={() => this.handleKeyChange("up")}
                icon="arrow-up"
                text="key"
              />
            </div>
            <div className="control">
              <Button
                onClick={() => this.handleKeyChange("down")}
                icon="arrow-down"
                text="key"
              />
            </div>
          </div>
          <div className="control" style={{ flexGrow: 1, textAlign: "right" }}>
            <Button
              onClick={this.handleSetSample}
              icon="tasks"
              text="sample"
            />
          </div>
        </div>

        <div className="content">
          <Score text={parsedText} />
        </div>

        <ControlField label="BPM">
          <input
            type="number"
            min="60"
            max="600"
            className="input"
            value={bpm}
            onChange={this.handleChangeBpm}
          />
          <Slider
            min="60"
            max="600"
            value={bpm}
            onChange={this.handleChangeBpm}
          />
        </ControlField>

        <ControlField label="volume">
          <input
            type="number"
            min="1"
            max="10"
            className="input"
            value={volume}
            onChange={this.handleChangeVolume}
          />
          <Slider
            min="1"
            max="10"
            value={volume}
            onChange={this.handleChangeVolume}
          />
        </ControlField>

        <SoundControl
          bpm={bpm}
          parsedText={parsedText}
          volume={volume}
          isPlaying={isPlaying}
          onChangePlaying={this.handleChangePlaying}
        />
      </div>
    )
  }
}
