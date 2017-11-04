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
    this.onChangeText   = this.onChangeText.bind(this)
    this.onChangeBpm    = this.onChangeBpm.bind(this)
    this.onChangeVolume = this.onChangeVolume.bind(this)
    this.state = { bpm: 120, volume: 10, inputText: defaultChordProgression }
    sound.initialize()
  }
  onChangeText(e) {
    this.setState({ inputText: e.target.value })
  }
  onChangeBpm(e) {
    this.setState({ bpm: e.target.value })
    sound.setBpm(e.target.value)
  }
  onChangeVolume(e) {
    this.setState({ volume: e.target.value })
    sound.setVolume(e.target.value)
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
            onChange={this.onChangeText}
          />
        </ControlField>

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
            onChange={this.onChangeBpm}
          />
          <Slider
            min="60"
            max="600"
            value={bpm}
            onChange={this.onChangeBpm}
          />
        </ControlField>

        <ControlField label="volume">
          <input
            type="number"
            min="1"
            max="10"
            className="input"
            value={volume}
            onChange={this.onChangeVolume}
          />
          <Slider
            min="1"
            max="10"
            value={volume}
            onChange={this.onChangeVolume}
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
