import React, { Component } from "react"
import Textarea             from "react-textarea-autosize"
import Button               from "../shared/button"
import ControlField         from "../shared/controlField"
import Progression          from "../Progression"
import * as sound           from "../../utils/sound"
import * as utils           from "../../utils"
import defaultProgression   from "../../constants/defaultProgression"

export default class App extends Component {
  constructor() {
    super()
    this.onChangeText = this.onChangeText.bind(this)
    this.onChangeBpm  = this.onChangeBpm.bind(this)
    this.state = { bpm: 120, inputText: defaultProgression }
    sound.initialize()
  }
  onChangeText(e) {
    this.setState({ inputText: e.target.value })
  }
  onChangeBpm(e) {
    this.setState({ bpm: e.target.value })
    sound.setBpm(e.target.value)
  }
  render() {
    const { inputText, bpm } = this.state
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
          <Progression text={parsedText} />
        </div>

        <ControlField label="BPM">
          <input
            type="number"
            className="input"
            value={bpm}
            onChange={this.onChangeBpm}
          />
        </ControlField>

        <div className="field is-grouped">
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
