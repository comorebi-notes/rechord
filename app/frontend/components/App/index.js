import React, { Component }            from "react"
import Button                          from "../shared/button"
import Slider                          from "../shared/slider"
import ControlField                    from "../shared/controlField"
import Score                           from "../Score"
import SoundControl                    from "../SoundControl"
import * as utils                      from "../../utils"
import sampleChordProgression          from "../../constants/sampleChordProgression"
import { DEFAULT_BPM, DEFAULT_VOLUME } from "../../constants"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText: sampleChordProgression,
      isPlaying: false,
      bpm:       DEFAULT_BPM,
      volume:    DEFAULT_VOLUME
    }
  }
  handleChangeText        = (e) => this.setState({ inputText: e.target.value })
  handleChangeBpm         = (e) => this.setState({ bpm: e.target.value })
  handleChangeVolume      = (e) => this.setState({ volume: e.target.value })
  handleClearText          = () => this.setState({ inputText: "" })
  handleSetSample          = () => this.setState({ inputText: sampleChordProgression })
  handleKeyChange = (operation) => this.setState({ inputText: utils.keyChange(this.state.inputText, operation) })
  handleChangePlaying = (state) => this.setState({ isPlaying: state })
  render() {
    const { inputText, bpm, volume, isPlaying } = this.state
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
            />
          </div>

          <div className="column control-ui" style={{ flexGrow: 0, width: 240 }}>
            <div className="field">
              <div className="control">
                <Button
                  onClick={this.handleClearText}
                  icon="trash"
                  text="clear"
                />
              </div>
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
            <div className="field">
              <div className="control">
                <Button
                  onClick={this.handleSetSample}
                  icon="tasks"
                  text="sample"
                />
              </div>
            </div>

            <SoundControl
              bpm={bpm}
              volume={volume}
              parsedText={parsedText}
              isPlaying={isPlaying}
              onChangePlaying={this.handleChangePlaying}
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
      </div>
    )
  }
}
