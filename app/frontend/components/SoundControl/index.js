import React, { Component } from "react"
import { Transport, Master, Sampler, MonoSynth, Part } from "tone"

import Button               from "../shared/Button"
import { times }            from "../../constants/times"
import * as instruments     from "../../constants/instruments"
import * as utils           from "../../utils"
import { MAX_VOLUME, STREAK_NOTE, RESUME_NOTE } from "../../constants"

// const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster()
// const reverb = new Tone.Freeverb(0.5).toMaster()

let instrument

export default class SoundControl extends Component {
  constructor(props) {
    super(props)
    this.setVolume(props.volume)
    this.setInstrument(props.instrumentType)
    this.state = {
      curretNotes: [],
      loading:     true,
      hasLoaded:   false
    }
  }
  componentWillReceiveProps({ bpm, volume, instrumentType, beatClick }) {
    if (bpm !== this.props.bpm) this.setBpm(bpm)
    if (volume !== this.props.volume) this.setVolume(volume)
    if (!this.state.hasLoaded || instrumentType !== this.props.instrumentType) {
      this.setInstrument(instrumentType, false)
      this.setState({ hasLoaded:  true })
    }
    if (this.state.click && (beatClick !== this.props.beatClick)) {
      this.state.click.volume.value = beatClick ? 0 : -100
    }
  }

  setInstrument = (type, setLoading = true) => {
    if (setLoading && this.state && this.state.loading === false) this.setState({ loading: true })
    const onLoad = () => this.setState({ loading: false })
    instrument = new Sampler(...instruments.types(onLoad)[type]).toMaster()
  }
  setClick = () => new MonoSynth(instruments.click).toMaster()

  setInstrumentSchedule = (score) => {
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
    new Part(triggerInstrument, score).start()
  }
  setClickSchedule = (score) => {
    const { time: selectedTime, beatClick } = this.props
    const click = this.setClick()
    this.setState({ click })
    click.volume.value = beatClick ? 0 : -100

    const triggerClick = (time) => {
      click.triggerAttackRelease("A6", "32n", time, 0.1)
    }
    const setSchedule = () => {
      const barLength = parseInt(score[score.length - 2].time.split(":")[0], 10)
      for (let bar = 0; bar <= barLength; bar += 1) {
        for (let beat = 0; beat < times[selectedTime][0]; beat += 1) {
          Transport.schedule(triggerClick, `${bar}:${beat}:0`)
        }
      }
    }
    setSchedule(score)
  }

  setBpm = (bpm) => {
    Transport.bpm.value = bpm
  }
  setVolume = (volume) => {
    const newVolume = volume - MAX_VOLUME
    Master.volume.value = newVolume
  }

  handleStop = () => {
    const { curretNotes } = this.state
    curretNotes.forEach(note => instrument.triggerRelease(note))
    Transport.stop()
    Transport.cancel()
    this.props.onChangePlaying(false)
  }
  handleStart = () => {
    const { time, parsedText, instrumentType, onChangePlaying } = this.props
    const { hasLoaded } = this.props
    const score = utils.makeScore(parsedText, time)

    if (!hasLoaded) {
      this.setInstrument(instrumentType, true)
      this.setState({ hasLoaded: true })
    }

    Transport.timeSignature = times[time]
    this.handleStop()
    this.setInstrumentSchedule(score)
    this.setClickSchedule(score)
    onChangePlaying(true)
    Transport.start(hasLoaded ? "+0.1" : "+1.0") // iOS対応の苦肉の策…
  }

  render() {
    const { isPlaying, parsedText } = this.props
    const { loading } = this.state
    const cannotPlay = loading || isPlaying || (parsedText.length === 1 && !parsedText[0][0])
    return (
      <div className="field sound-control">
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
              icon={loading ? "circle-o-notch fa-spin" : "play"}
              text={loading ? "loading..." : "play"}
              disabled={cannotPlay}
            />
          </div>
        )}
      </div>
    )
  }
}
