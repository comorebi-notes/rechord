import React, { Component }    from "react"
import Textarea                from "react-textarea-autosize"
import Button                  from "../shared/button"
import Slider                  from "../shared/slider"
import ControlField            from "../shared/controlField"
import Score                   from "../Score"
import * as sound              from "../../utils/sound"
import * as utils              from "../../utils"
import defaultChordProgression from "../../constants/defaultChordProgression"

export default class App extends Component {
  constructor() {
    super()
    this.handleChangeText   = this.handleChangeText.bind(this)
    this.handleChangeBpm    = this.handleChangeBpm.bind(this)
    this.handleChangeVolume = this.handleChangeVolume.bind(this)
    this.handleClearText    = this.handleClearText.bind(this)
    this.handleSetSample    = this.handleSetSample.bind(this)
    this.handleKeyChange    = this.handleKeyChange.bind(this)
    this.state = { bpm: 120, volume: 10, inputText: defaultChordProgression }
    sound.initialize()
  }
  handleChangeText(e) {
    this.setState({ inputText: e.target.value })
  }
  handleChangeBpm(e) {
    this.setState({ bpm: e.target.value })
    sound.setBpm(e.target.value)
  }
  handleChangeVolume(e) {
    this.setState({ volume: e.target.value })
    sound.setVolume(e.target.value)
  }
  handleClearText() {
    this.setState({ inputText: "" })
    sound.stop()
  }
  handleSetSample() {
    this.setState({ inputText: defaultChordProgression })
  }
  handleKeyChange(operation) {
    this.setState({ inputText: utils.keyChange(this.state.inputText, operation) })
  }
  render() {
    const { inputText, bpm, volume } = this.state
    const parsedText = utils.parseChordProgression(inputText)
    return (
      <div>
        <ControlField label="chord progression">
          <Textarea
            className="textarea"
            placeholder="e.g. D69 | Aadd9 | E | F#m7add11"
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

        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <Button
              onClick={() => sound.start(parsedText)}
              color="info"
              icon="play"
              text="play"
            />
          </div>
          <div className="control">
            <Button
              onClick={sound.stop}
              color="danger"
              icon="stop"
              text="stop"
            />
          </div>
        </div>
      </div>
    )
  }
}
