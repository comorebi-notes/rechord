import Tone from "tone"
import { Chord } from "tonal"

let synth
const baseKey = 3
const defaultBpm = 120
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

const setSynth = () => {
  synth = new Tone.PolySynth({ polyphony: 6, voice: Tone.Synth }).toMaster()
  synth.set(polySynthOptions)
}

const setBeats = (length) => {
  switch (length) {
    case 1:  return [0]
    case 2:  return [0, 2]
    case 4:  return [0, 1, 2, 3]
    default: return [0]
  }
}

const makeProgression = (text) => {
  const progression = []
  const fixNote = (notes) => notes.map(note => note.replace(/##/, "#"))
  let bar = 0

  text.forEach(line => (
    line.forEach(chords => {
      const beats = setBeats(chords.length)

      chords.forEach((chord, index) => {
        const time     = `${bar}:${beats[index]}:0`
        const notes    = Chord.notes(`${chord[0]}${baseKey}`, chord[1])
        const duration = chords.length === 1 ? "1m" : `${chords.length}n`

        progression.push({ time, duration, notes: fixNote(notes) })
      })

      bar += 1
    })
  ))

  return progression
}

const setPlay = (time, value) => (
  synth.triggerAttackRelease(value.notes, value.duration, time)
)

export const start = (parsedText) => {
  setSynth()
  const startTime = Tone.context.currentTime + 0.1
  const progression = makeProgression(parsedText)
  new Tone.Part(setPlay, progression).start(startTime)
  Tone.Transport.start(0)
}

export const stop = () => (
  Tone.Transport.cancel()
)

export const setBpm = (bpm) => {
  Tone.Transport.bpm.value = bpm
}

export const initialize = () => {
  setBpm(defaultBpm)
}
