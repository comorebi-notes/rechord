import React, { Component } from "react"
import { Transport, Master, Sampler, MonoSynth, Part } from "tone"

import Button                from "../../commons/Button"
import { beats }             from "../../../constants/beats"
import * as instruments      from "../../../constants/instruments"
import * as utils            from "../../../utils"
import { scoreMaker }        from "../../../utils/scoreMaker"
import { window, navigator } from "../../../utils/browser-dependencies"
import { MAX_VOLUME, STREAK_NOTE, RESUME_NOTE } from "../../../constants"

export default class SoundControl extends Component {
  constructor(props) {
    super(props)
    this.setBpm(props.bpm)
    this.setVolume(props.volume)
    this.setInstrument(props.instrumentType)
    this.state = {
      instrument:  this.setInstrument(props.instrumentType),
      click:       this.setClick(),
      currentNotes: [],
      loading:     true,
      hasLoaded:   false
    }
  }

  // ===== iOS 対応の苦肉の策 =====
  // iOS では必ずユーザ操作によって音源がロードされる必要がある。
  // 初回スクロール時か props の初回変更時に、
  // hasLoaded でなければ音源をロードし、スクロールのイベントリスナーを外す。
  // https://qiita.com/yohei-qiita/items/78805185ab218468215e
  componentDidMount() {
    const isIOS = /[ (]iP/.test(navigator.userAgent)
    if (isIOS) {
      window.addEventListener("scroll", this.setInstrumentForIOS)
    } else {
      this.onMount(() => this.setState({ hasLoaded: true }))
    }
  }
  componentWillReceiveProps({ bpm, volume, instrumentType, enabledClick }) {
    if (bpm !== this.props.bpm) this.setBpm(bpm)
    if (volume !== this.props.volume) this.setVolume(volume)
    if (!this.state.hasLoaded || instrumentType !== this.props.instrumentType) {
      this.setLoaded(instrumentType, true)
    }
    if (this.state.click && (enabledClick !== this.props.enabledClick)) {
      this.state.click.volume.value = enabledClick ? 0 : -100
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
      const { notes } = value
      const { currentNotes } = this.state

      if (notes[0] !== RESUME_NOTE) {
        this.releaseNotes(currentNotes)
        if (notes === "fin") {
          this.handleStop()
        } else if (notes[0] === STREAK_NOTE) {
          this.attackNotes(currentNotes)
        } else {
          this.attackNotes(notes)
          this.setState({ currentNotes: notes })
        }
      }
    }
    new Part(triggerInstrument, score).start()
  }
  setClickSchedule = (score) => {
    const { beat, enabledClick } = this.props
    const click = this.setClick()
    this.setState({ click })
    click.volume.value = enabledClick ? 0 : -100

    const triggerClick = (time) => click.triggerAttackRelease("A6", "32n", time, 0.1)
    const setSchedule = () => {
      for (let bar = 0; bar <= utils.barLength(score); bar += 1) {
        for (let currentBeat = 0; currentBeat < beats[beat][0]; currentBeat += 1) {
          Transport.schedule(triggerClick, `${bar}:${currentBeat}:0`)
        }
      }
    }
    setSchedule(score)
  }
  setBpm = (bpm) => { Transport.bpm.value = bpm }
  setVolume = (volume) => { Master.volume.value = volume - MAX_VOLUME }

  attackNotes  = (notes) => notes.forEach(note => this.state.instrument.triggerAttack(note))
  releaseNotes = (notes) => notes.forEach(note => this.state.instrument.triggerRelease(note))

  handleChangePlaying = (state) => this.props.handleSetState({ isPlaying: state }, false)
  handleStop = () => {
    this.releaseNotes(this.state.currentNotes)
    Transport.stop()
    Transport.cancel()
    this.handleChangePlaying(false)
  }
  handleStart = () => {
    const { beat, parsedText } = this.props
    const score = scoreMaker(parsedText, beat)

    Transport.timeSignature = beats[beat]
    this.handleStop()
    this.setInstrumentSchedule(score)
    this.setClickSchedule(score)
    this.handleChangePlaying(true)
    Transport.start("+0.1")
  }

  render() {
    const { isPlaying, parsedText, bpm } = this.props
    const { loading } = this.state
    const isBlankText = !parsedText || (parsedText && parsedText.every(text => !text[0]))
    const cannotPlay = loading || isPlaying || bpm <= 0 || isBlankText
    return (
      <div className="field sound-control">
        <div className="control">
          {isPlaying ? (
            <Button
              onClick={this.handleStop}
              color="danger"
              size="medium"
              icon="stop"
              text="stop"
              disabled={!isPlaying}
            />
          ) : (
            <Button
              onClick={this.handleStart}
              color="info"
              size="medium"
              icon={loading ? "circle-o-notch fa-spin" : "play"}
              text={loading ? "loading..." : "play"}
              disabled={cannotPlay}
            />
          )}
        </div>
      </div>
    )
  }
}
