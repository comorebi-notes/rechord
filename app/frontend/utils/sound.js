import Tone from "tone"
import { Chord } from "tonal"

let synth
const baseKey = 3
const defaultBpm = 120

Tone.Transport.bpm.value = defaultBpm
Tone.Transport.start()

const setPlay = (time, value) => (
  synth.triggerAttackRelease(value.note, value.duration, time)
)

const setBeats = (length) => {
  switch (length) {
    case 1:  return [0]
    case 2:  return [0, 2]
    case 4:  return [0, 1, 2, 3]
    default: return [0]
  }
}

export const start = (parsedText) => {
  const progression = []
  let bar = 0

  parsedText.forEach(line => (
    line.forEach(chords => {
      const beats = setBeats(chords.length)

      chords.forEach((chord, index) => {
        const time = `${bar}:${beats[index]}:0`
        const note = Chord.notes(`${chord[0]}${baseKey}`, chord[1])
        const duration = chords.length === 1 ? "1m" : `${chords.length}n`

        progression.push({ time, note, duration })
      })

      bar += 1
    })
  ))

  synth = new Tone.PolySynth(6, Tone.Synth).toMaster()
  new Tone.Part(setPlay, progression).start()
}
export const stop = () => Tone.Transport.cancel()

export const setBpm = (bpm) => {
  Tone.Transport.bpm.value = bpm
}
