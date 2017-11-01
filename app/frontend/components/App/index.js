import React, { Component } from "react"
import * as sound from "../../utils/sound"

export default class App extends Component {
  constructor() {
    super()
    this.sound = this.sound.bind(this)
  }
  sound() {
    sound.basicSound()
  }
  render() {
    return (
      <div>
        <button onClick={this.sound} className="button is-primary">
          click to play!
        </button>
      </div>
    )
  }
}
