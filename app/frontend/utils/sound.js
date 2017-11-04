import Tone from "tone"
import * as utils from "./"

let synth
let click

const defaultBpm = 120
const minBpm     = 60
const maxBpm     = 600
const minVolume  = 1
const maxVolume  = 10
// const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster()
// const reverb = new Tone.Freeverb(0.5).toMaster()
const polySynthOptions = {
  oscillator: {
    type: "triangle24"
  },
  envelope: {
    attack:  0.005,
    decay:   8,
    sustain: 0.05,
    release: 1
  }
}
const clickOptions = {
  oscillator: {
    type: "square"
  },
  envelope: {
    attack:  0.005,
    decay:   0.2,
    sustain: 0.4,
    release: 1.4,
  },
  filterEnvelope: {
    attack:  0.005,
    decay:   0.1,
    sustain: 0.05,
    release: 0.8,
    baseFrequency: 300,
    octaves: 4
  }
}

const setSynth = () => {
  synth = new Tone.PolySynth({ polyphony: 6, voice: Tone.Synth }).toMaster()
  synth.set(polySynthOptions)
}

const setClick = () => {
  click = new Tone.MonoSynth(clickOptions).toMaster()
}

const valueInRange = (value, min, max) => {
  if (value < min) return min
  if (max < value) return max
  return value
}

export const setBpm = (bpm) => {
  Tone.Transport.bpm.value = valueInRange(bpm, minBpm, maxBpm)
}

export const setVolume = (volume) => {
  const newVolume = (valueInRange(volume, minVolume, maxVolume) - maxVolume) * 3
  Tone.Master.volume.value = newVolume
}

const triggerSynth = (time, value) => {
  synth.triggerAttackRelease(value.notes, value.duration, time, 3.0 / value.notes.length)
}

const triggerClick = (time) => {
  click.triggerAttackRelease("A6", "32n", time, 0.1)
}

const setClickSchedule = (barLength) => {
  for (let bar = 0; bar <= barLength; bar += 1) {
    for (let beat = 0; beat < 4; beat += 1) {
      Tone.Transport.schedule(triggerClick, `${bar}:${beat}:0`)
    }
  }
}

export const stop = () => {
  Tone.Transport.stop()
  Tone.Transport.cancel()
}

export const start = (parsedText) => {
  stop()
  setSynth()
  setClick()

  const score = utils.makeScore(parsedText)
  new Tone.Part(triggerSynth, score).start()
  const barLength = parseInt(score[score.length - 1].time.split(":")[0], 10)
  setClickSchedule(barLength)

  Tone.Transport.start("+0.2")
}

export const initialize = () => {
  setBpm(defaultBpm)
}
