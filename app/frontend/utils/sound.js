import Tone from "tone"
import { Chord } from "tonal"

const baseKey = 3
let synth
Tone.Transport.bpm.value = 120
Tone.Transport.start()

const setPlay = (time, value) => (
  synth.triggerAttackRelease(value.note, value.duration, time)
)

export const start = (parsedText) => {
  const progression = []
  let bar = 0
  parsedText.forEach(line => (
    line.forEach(chords => {
      let beats = [0]
      switch (chords.length) {
        case 1: {
          beats = [0]
          break
        }
        case 2: {
          beats = [0, 2]
          break
        }
        case 4: {
          beats = [0, 1, 2, 3]
          break
        }
      }
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
