import React, { Component } from "react"
import { Chord, Scale } from "tonal"
import * as sound from "../../utils/sound"

export default class App extends Component {
  constructor() {
    super()
    this.onChangeText = this.onChangeText.bind(this)
    this.sound = this.sound.bind(this)
    this.state = {
      inputText: ""
    }
  }
  onChangeText(e) {
    this.setState({ inputText: e.target.value })
  }
  sound() {
    sound.basicSound()
  }
  render() {
    const { inputText } = this.state
    return (
      <div>
        <div className="field">
          <label className="label">
            Please input chord progression.
          </label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="e.g. D6(9) | Aadd9 | E | F#m7(11)"
              value={inputText}
              onChange={this.onChangeText}
            />
          </div>
        </div>

        <div className="content">
          <p>{inputText}</p>
          <p>Chord.notes() : {Chord.notes(inputText).join(", ")}</p>
          <p>Scale.notes() : {Scale.notes(inputText).join(", ")}</p>
        </div>

        <div className="control">
          <button onClick={this.sound} className="button is-primary">
            click to play!
          </button>
        </div>
      </div>
    )
  }
}
