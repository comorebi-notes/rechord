import React, { Component } from "react"
import { Chord, Scale } from "tonal"
import classNames from "classnames"
import * as sound from "../../utils/sound"
import * as utils from "../../utils"

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
          <div className="progression">
            {utils.parseChordProgression(inputText).map(line => (
              <div>
                {line.map(chords => (
                  <div className="chords">
                    {chords.map(chord => (
                      <span className="chord">
                        <span className={classNames("root", chord[0])}>
                          {chord[0]}
                        </span>
                        <span className="type">
                          {chord[1]}
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {false && <p>Chord.notes() : {Chord.notes(inputText).join(", ")}</p>}
          {false && <p>Scale.notes() : {Scale.notes(inputText).join(", ")}</p>}
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
