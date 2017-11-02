import React, { Component } from "react"
import classNames from "classnames"
import Textarea from "react-textarea-autosize"
import * as sound from "../../utils/sound"
import * as utils from "../../utils"

export default class App extends Component {
  constructor() {
    super()
    this.onChangeText = this.onChangeText.bind(this)
    this.onChangeBpm = this.onChangeBpm.bind(this)
    this.state = {
      bpm: 120,
      inputText: [
        "# e.g.",
        "C | G | Am7 | Em7",
        "F | Em7 Am7 | Dm7 | G7",
        "FM7 | G7 | E7 | Am7",
        "F C | Dm7 G7sus4 | C"
      ].join("\n")
    }
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
        <div className="field">
          <label className="label">
            chord progression
          </label>
          <div className="control">
            <Textarea
              className="textarea"
              placeholder="e.g. D69 | Aadd9 | E | F#m7add11"
              value={inputText}
              onChange={this.onChangeText}
            />
          </div>
        </div>

        <div className="content">
          <div className="progression">
            {parsedText.map((line, i) => (
              <div key={`${line}${i}`}>
                {line.map((chords, j) => (
                  <div className="chords" key={`${chords}${j}`}>
                    {chords.map((chord, k) => (
                      <span className="chord" key={`${chord}${k}`}>
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
        </div>

        <div className="field">
          <label className="label">
            BPM
          </label>
          <div className="control">
            <input
              type="number"
              className="input"
              value={bpm}
              onChange={this.onChangeBpm}
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              onClick={() => sound.start(parsedText)}
              className="button is-primary"
            >
              <span className="icon is-small">
                <i className="fa fa-play" />
              </span>
              <span>
                click to play!
              </span>
            </button>
          </div>
          <div className="control">
            <button
              onClick={sound.stop}
              className="button is-danger"
            >
              <span className="icon is-small">
                <i className="fa fa-stop" />
              </span>
              <span>
                stop!
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
