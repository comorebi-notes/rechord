import React, { Component }            from "react"
import Button                          from "../shared/button"
import Score                           from "../Score"
import SoundControl                    from "../SoundControl"
import * as utils                      from "../../utils"
import sampleChordProgression          from "../../constants/sampleChordProgression"
import { MIN_BPM, MAX_BPM, MIN_VOLUME, MAX_VOLUME, DEFAULT_BPM, DEFAULT_VOLUME } from "../../constants"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      inputText: sampleChordProgression,
      isPlaying: false,
      beatClick: false,
      bpm:       DEFAULT_BPM,
      volume:    DEFAULT_VOLUME
    }
  }
  handleChangeText        = (e) => this.setState({ inputText: e.target.value })
  handleChangeBpm         = (e) => this.setState({ bpm: utils.valueInRange(e.target.value, MIN_BPM, MAX_BPM) })
  handleChangeVolume      = (e) => this.setState({ volume: utils.valueInRange(e.target.value, MIN_VOLUME, MAX_VOLUME) })
  handleClearText          = () => this.setState({ inputText: "" })
  handleSetSample          = () => this.setState({ inputText: sampleChordProgression })
  handleKeyChange = (operation) => this.setState({ inputText: utils.keyChange(this.state.inputText, operation) })
  handleChangePlaying = (state) => this.setState({ isPlaying: state })
  handleToggleClick       = (e) => this.setState({ beatClick: e.target.checked })
  render() {
    const { inputText, bpm, volume, isPlaying, beatClick } = this.state
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

          <div className="column control-ui">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <div className="control">
                    <Button
                      onClick={this.handleClearText}
                      icon="trash"
                      text="clear"
                    />
                  </div>
                </div>
                <div className="field has-addons key-control">
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
              </div>
              <div className="column">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">
                      BPM
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          type="number"
                          min="60"
                          max="600"
                          className="input"
                          value={bpm}
                          onChange={this.handleChangeBpm}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">
                      Volume
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          className="input"
                          value={volume}
                          onChange={this.handleChangeVolume}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal click-control">
                  <div className="field-label is-normal">
                    <label className="label">
                      Click
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <div className="field">
                          <input
                            type="checkbox"
                            id="beatClick"
                            name="beatClick"
                            className="switch is-rounded is-info is-medium"
                            checked={beatClick}
                            onChange={this.handleToggleClick}
                          />
                          <label htmlFor="beatClick" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SoundControl
              bpm={bpm}
              volume={volume}
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
