import React, { Component } from "react"
import Tone                 from "tone"
import Button               from "../shared/button"
import * as soundOptions    from "../../constants/soundOptions"
import * as utils           from "../../utils"
import { MIN_BPM, MAX_BPM, MIN_VOLUME, MAX_VOLUME, STREAK_NOTE, RESUME_NOTE } from "../../constants"

// const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster()
// const reverb = new Tone.Freeverb(0.5).toMaster()

export default class SoundControl extends Component {
  constructor() {
    super()
    this.state = { curretNotes: [] }
  }
  componentWillReceiveProps({ bpm, volume }) {
    this.setBpm(bpm)
    this.setVolume(volume)
  }
  setSynth = (score) => {
    // const synth = new Tone.Synth(soundOptions.synths[0]).toMaster()
    const synth = new Tone.Sampler(...soundOptions.piano).toMaster()

    const triggerSynth = (time, value) => {
      const { notes } = value
      const { curretNotes } = this.state
      if (notes[0] !== RESUME_NOTE) {
        curretNotes.forEach(note => synth.triggerRelease(note))
        if (notes === "fin") {
          this.handleStop()
        } else if (notes[0] === STREAK_NOTE) {
          curretNotes.forEach(note => synth.triggerAttack(note))
        } else {
          notes.forEach(note => synth.triggerAttack(note))
          this.setState({ curretNotes: notes })
        }
      }
    }
    new Tone.Part(triggerSynth, score).start()
  }
  setClick = (score) => {
    const click = new Tone.MonoSynth(soundOptions.clicks[0]).toMaster()
    const triggerClick = (time) => click.triggerAttackRelease("A6", "32n", time, 0.1)
    const setSchedule = () => {
      const barLength = parseInt(score[score.length - 2].time.split(":")[0], 10)
      for (let bar = 0; bar <= barLength; bar += 1) {
        for (let beat = 0; beat < 4; beat += 1) {
          Tone.Transport.schedule(triggerClick, `${bar}:${beat}:0`)
        }
      }
    }
    setSchedule(score)
  }
  setBpm = (bpm) => {
    Tone.Transport.bpm.value = utils.valueInRange(bpm, MIN_BPM, MAX_BPM)
  }
  setVolume = (volume) => {
    const newVolume = (utils.valueInRange(volume, MIN_VOLUME, MAX_VOLUME) - MAX_VOLUME) * 3
    Tone.Master.volume.value = newVolume
  }
  handleStop = () => {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.props.onChangePlaying(false)
  }
  handleStart = () => {
    const score = utils.makeScore(this.props.parsedText)
    this.handleStop()
    this.setSynth(score)
    this.setClick(score)
    Tone.Transport.start("+0.2")
    this.props.onChangePlaying(true)
  }
  render() {
    const { isPlaying, parsedText } = this.props
    const cannotPlay = isPlaying || (parsedText.length === 1 && !parsedText[0][0])
    return (
      <div className="field">
        {isPlaying ? (
          <div className="control">
            <Button
              onClick={this.handleStop}
              color="danger"
              size="medium"
              icon="stop"
              text="stop"
              disabled={!isPlaying}
            />
          </div>
        ) : (
          <div className="control">
            <Button
              onClick={this.handleStart}
              color="info"
              size="medium"
              icon="play"
              text="play"
              disabled={cannotPlay}
            />
          </div>
        )}
      </div>
    )
  }
}
