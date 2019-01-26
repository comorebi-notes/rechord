import React, { Component } from "react"
import Tone, { Transport, Master, Sampler, MonoSynth, Part } from "tone"

import Button           from "../../commons/Button"
import { beats }        from "../../../constants/beats"
import * as instruments from "../../../constants/instruments"
import * as utils       from "../../../utils"
import * as decorator   from "../../../decorators/scoreEditorDecorator"
import { window, document, navigator, AudioContext }        from "../../../utils/browser-dependencies"
import { MAX_VOLUME, STREAK_NOTE, RESUME_NOTE, END_MARKER } from "../../../constants"

// const LATENCY_HINT = 0.28
// const UPDATE_INTERVAL = 0.02

const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup'

export default class SoundControl extends Component {
  constructor(props) {
    super(props)

    // reset Tone.js
    Transport.stop()
    Transport.cancel()
    Transport.clear()
    if (Tone.context.close) { // Google Crawler 対策
      Tone.context.close()
      Tone.context = new AudioContext()
    }
    Tone.context.resume()

    // Tone.context.latencyHint = LATENCY_HINT
    // Tone.context.updateInterval = UPDATE_INTERVAL

    this.setBpm(props.bpm)
    this.setVolume(props.volume)
    this.setInstrument(props.instrumentType)
    this.state = {
      instrument:   this.setInstrument(props.instrumentType),
      click:        this.setClick(),
      currentNotes: [],
      loading:      true,
      hasLoaded:    false
    }
  }

  componentDidMount() {
    // ===== iOS 対応の苦肉の策 =====
    // iOS では必ずユーザ操作によって音源がロードされる必要がある。
    // 初回スクロール時か props の初回変更時に、
    // hasLoaded でなければ音源をロードし、スクロールのイベントリスナーを外す。
    // https://qiita.com/yohei-qiita/items/78805185ab218468215e
    const isIOS = /[ (]iP/.test(navigator.userAgent)
    if (isIOS) {
      window.addEventListener("scroll", this.setInstrumentForIOS)
    } else {
      this.onMount(() => this.setState({ hasLoaded: true }))
    }

    // ユーザイベントの後に AudioContext の resume が必要なため。
    window.addEventListener(eventName, this.resumeAudioContext)
  }

  componentWillReceiveProps({ bpm, volume, loop, enabledClick, instrumentType }) {
    if (bpm    !== this.props.bpm)    this.setBpm(bpm)
    if (volume !== this.props.volume) this.setVolume(volume)
    if (loop   !== this.props.loop)   Transport.loop = loop
    if (this.state.click && (enabledClick !== this.props.enabledClick)) {
      this.state.click.volume.value = enabledClick ? 0 : -100
    }
    if (!this.state.hasLoaded || instrumentType !== this.props.instrumentType) {
      this.setLoaded(instrumentType, true)
    }
  }
  componentWillUnmount() {
    this.handleStop()
  }

  onMount = (callback) => callback()
  setInstrumentForIOS = () => {
    if (!this.state.hasLoaded) this.setLoaded(this.props.instrumentType)
    window.removeEventListener("scroll", this.setInstrumentForIOS)
  }
  resumeAudioContext = () => {
    Tone.context.resume()
    window.removeEventListener(eventName, this.resumeAudioContext)
  }
  setLoaded = (instrumentType, setLoading = false) => (
    this.setState({
      instrument: this.setInstrument(instrumentType, setLoading),
      hasLoaded:  true
    })
  )
  setInstrument = (type, setLoading = true) => {
    if (setLoading && this.state && this.state.loading === false) this.setState({ loading: true })
    const onLoad = () => this.setState({ loading: false })
    return new Sampler(...instruments.types(onLoad)[type]).toMaster()
  }
  setClick = () => new MonoSynth(instruments.click).toMaster()
  setInstrumentSchedule = (score) => {
    const triggerInstrument = (time, value) => {
      const { notes, index } = value
      const { currentNotes } = this.state
      const capoNotes = utils.transpose(notes, this.props.capo)

      if (value.time === "0:0:0") decorator.allDeactivateCurrentNotes()
      switch (notes[0]) {
        case RESUME_NOTE:
          decorator.activateCurrentNotes(index)
          break
        case STREAK_NOTE:
          this.releaseNotes(currentNotes, time)
          this.attackNotes(currentNotes, time, index)
          break
        case END_MARKER:
          this.releaseNotes(currentNotes, time)
          this.handleStop()
          break
        default:
          this.releaseNotes(currentNotes, time)
          this.attackNotes(capoNotes, time, index)
          this.setState({ currentNotes: capoNotes })
      }
    }
    const part = new Part(triggerInstrument, score)
    part.loop = false
    part.start()
  }
  setClickSchedule = (score) => {
    const { beat, enabledClick } = this.props
    const click = this.setClick()
    this.setState({ click })
    click.volume.value = enabledClick ? 0 : -100

    // const schedule = []
    // for (let i = 0; i < beats[beat][0]; i += 1) schedule.push(`0:${i}:0`)
    // const part = new Part(triggerClick, schedule)
    // part.loop = true
    // part.start()

    const triggerClick = (time) => click.triggerAttackRelease("A6", "32n", time, 0.1)
    for (let bar = 0; bar <= utils.barLength(score); bar += 1) {
      for (let currentBeat = 0; currentBeat < beats[beat][0]; currentBeat += 1) {
        Transport.schedule(triggerClick, `${bar}:${currentBeat}:0`)
      }
    }
  }
  setBpm = (bpm) => { Transport.bpm.value = bpm }
  setVolume = (volume) => { Master.volume.value = volume - MAX_VOLUME }

  attackNotes  = (notes, time, index) => {
    notes.forEach(note => this.state.instrument.triggerAttack(note, time))
    if (index > -1) decorator.activateCurrentNotes(index)
  }
  releaseNotes = (notes, time) => {
    if (notes) notes.forEach(note => this.state.instrument.triggerRelease(note, time))
  }

  handleChangePlaying = (state) => this.props.handleSetState({ isPlaying: state }, false)
  handleStop = () => {
    Transport.stop()
    Transport.cancel()
    Transport.clear()
    this.releaseNotes(this.state.currentNotes)
    decorator.allDeactivateCurrentNotes()
    this.handleChangePlaying(false)
  }
  handleStart = () => {
    const { score, beat } = this.props

    Transport.timeSignature = beats[beat]
    this.handleStop()
    this.handleChangePlaying(true)
    this.setClickSchedule(score)
    this.setInstrumentSchedule(score)
    Transport.loopEnd = score[score.length - 1].time
    Transport.start("+0.3")
  }

  render() {
    const { isPlaying, bpm, isValid } = this.props
    const { loading } = this.state
    const cannotPlay = loading || isPlaying || bpm <= 0 || !isValid
    return (
      <div className="field sound-control">
        <div className="control">
          {isPlaying ? (
            <Button
              onClick={this.handleStop}
              color="danger"
              size="medium"
              icon="stop"
              text="STOP"
              customClass="animate-button"
              disabled={!isPlaying}
            />
          ) : (
            <Button
              onClick={this.handleStart}
              color="info"
              size="medium"
              icon={loading ? "circle-o-notch fa-spin" : "play"}
              text={loading ? "loading..." : "PLAY"}
              customClass="animate-button"
              disabled={cannotPlay}
            />
          )}
        </div>
      </div>
    )
  }
}
