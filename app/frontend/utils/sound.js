import Tone from "tone"
import { Chord } from "tonal"

let synth
let click
const baseKey = 3
const defaultBpm = 120
const minBpm = 60
const maxBpm = 600
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

const setBeats = (length) => {
  switch (length) {
    case 1:  return [0]
    case 2:  return [0, 2]
    case 4:  return [0, 1, 2, 3]
    default: return [0]
  }
}

const makeScore = (text) => {
  const score = []
  const fixNote = (notes) => notes.map(note => note.replace(/##/, "#"))
  let bar = 0

  text.forEach(line => (
    line.forEach(chords => {
      const beats = setBeats(chords.length)

      chords.forEach((chord, index) => {
        const time     = `${bar}:${beats[index]}:0`
        const notes    = Chord.notes(`${chord[0]}${baseKey}`, chord[1])
        const duration = chords.length === 1 ? "1m" : `${chords.length}n`

        score.push({ time, duration, notes: fixNote(notes) })
      })

      bar += 1
    })
  ))
  return score
}

const triggerSynth = (time, value) => {
  synth.triggerAttackRelease(value.notes, value.duration, time, 3.0 / value.notes.length)
}

const triggerClick = (time) => {
  click.triggerAttackRelease("A6", "32n", time, 0.25)
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
  const score = makeScore(parsedText)
  new Tone.Part(triggerSynth, score).start()

  setClick()
  const barLength = parseInt(score[score.length - 1].time.split(":")[0], 10)
  setClickSchedule(barLength)
  Tone.Transport.start("+0.2")
}

export const setBpm = (bpm) => {
  let targetBpm = 120
  if (bpm < minBpm) {
    targetBpm = minBpm
  } else if (bpm > maxBpm) {
    targetBpm = maxBpm
  } else {
    targetBpm = bpm
  }
  Tone.Transport.bpm.value = targetBpm
}

export const initialize = () => {
  setBpm(defaultBpm)
}
