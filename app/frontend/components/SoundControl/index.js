import React, { Component }    from "react"
import Tone                    from "tone"
import Button                  from "../shared/button"
import * as soundOptions       from "../../constants/soundOptions"
import * as utils              from "../../utils"

const minBpm     = 60
const maxBpm     = 600
const minVolume  = 1
const maxVolume  = 10
// const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster()
// const reverb = new Tone.Freeverb(0.5).toMaster()

export default class SoundControl extends Component {
  constructor() {
    super()
    this.setSynth    = this.setSynth.bind(this)
    this.setClick    = this.setClick.bind(this)
    this.setBpm      = this.setBpm.bind(this)
    this.setVolume   = this.setVolume.bind(this)
    this.handleStop  = this.handleStop.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.state = { curretNotes: [] }
  }
  componentWillReceiveProps() {
    const { bpm, volume } = this.props
    this.setBpm(bpm)
    this.setVolume(volume)
  }
  setSynth(score) {
    // const synth = new Tone.Synth(soundOptions.synths[0]).toMaster()
    const synth = new Tone.Sampler(...soundOptions.piano).toMaster()
    const triggerSynth = (time, value) => {
      const { notes } = value
      if (notes[0] !== "%") {
        this.state.curretNotes.forEach(note => synth.triggerRelease(note))
        if (notes === "fin") {
          this.handleStop()
        } else {
          notes.forEach(note => synth.triggerAttack(note))
          this.setState({ curretNotes: notes })
        }
      }
    }
    new Tone.Part(triggerSynth, score).start()
  }
  setClick(score) {
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
  setBpm(bpm) {
    Tone.Transport.bpm.value = utils.valueInRange(bpm, minBpm, maxBpm)
  }
  setVolume(volume) {
    const newVolume = (utils.valueInRange(volume, minVolume, maxVolume) - maxVolume) * 3
    Tone.Master.volume.value = newVolume
  }
  handleStop() {
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.props.onChangePlaying(false)
  }
  handleStart() {
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
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <Button
            onClick={this.handleStart}
            color="info"
            icon="play"
            text="play"
            disabled={cannotPlay}
          />
        </div>
        <div className="control">
          <Button
            onClick={this.handleStop}
            color="danger"
            icon="stop"
            text="stop"
            disabled={!isPlaying}
          />
        </div>
      </div>
    )
  }
}
