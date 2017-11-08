import React, { Component } from "react"
import Tone                 from "tone"
import Button               from "../shared/button"
import * as instruments     from "../../constants/instruments"
import * as utils           from "../../utils"
import { MAX_VOLUME, STREAK_NOTE, RESUME_NOTE } from "../../constants"

// const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster()
// const reverb = new Tone.Freeverb(0.5).toMaster()

const setInstrument = (type) => new Tone.Sampler(...instruments.types[type]).toMaster()
const setClick = () => new Tone.MonoSynth(instruments.click).toMaster()

export default class SoundControl extends Component {
  constructor() {
    super()
    this.state = {
      curretNotes: [],
      instrument:  setInstrument("Piano")
    }
  }
  componentWillReceiveProps({ bpm, volume, instrument }) {
    if (bpm !== this.props.bpm) this.setBpm(bpm)
    if (volume !== this.props.volume) this.setVolume(volume)
    if (instrument !== this.props.instrument) {
      this.handleStop()
      this.setState({ instrument: setInstrument(instrument) })
    }
  }
  setInstrumentSchedule = (score) => {
    const instrument = setInstrument(this.props.instrument)
    this.setState({ instrument })
    const triggerInstrument = (time, value) => {
      const { notes } = value
      const { curretNotes } = this.state
      if (notes[0] !== RESUME_NOTE) {
        curretNotes.forEach(note => instrument.triggerRelease(note))
        if (notes === "fin") {
          this.handleStop()
        } else if (notes[0] === STREAK_NOTE) {
          curretNotes.forEach(note => instrument.triggerAttack(note))
        } else {
          notes.forEach(note => instrument.triggerAttack(note))
          this.setState({ curretNotes: notes })
        }
      }
    }
    new Tone.Part(triggerInstrument, score).start()
  }
  setClickSchedule = (score) => {
    const click = setClick()
    const triggerClick = (time) => {
      click.volume.value = this.props.beatClick ? 0 : -100
      click.triggerAttackRelease("A6", "32n", time, 0.1)
    }
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
    Tone.Transport.bpm.value = bpm
  }
  setVolume = (volume) => {
    const newVolume = (volume - MAX_VOLUME) * 3
    Tone.Master.volume.value = newVolume
  }
  handleStop = () => {
    const { curretNotes, instrument } = this.state
    curretNotes.forEach(note => instrument.triggerRelease(note))
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.props.onChangePlaying(false)
  }
  handleStart = () => {
    const score = utils.makeScore(this.props.parsedText)
    this.handleStop()
    this.setInstrumentSchedule(score)
    this.setClickSchedule(score)
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
