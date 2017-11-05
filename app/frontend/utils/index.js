import { Chord } from "tonal"

export const parseChordProgression = (text) => {
  let score = []

  score = text.split("\n")
  score = score.filter(line => line[0] !== "#")
  score = score.map(line => line.split("|"))
  score = score.map(line => (
    line
      .map(chords => chords.trim())
      .filter(chords => chords !== "")
      .map(chords => chords.split(" "))
      .map(chords => chords.map(chord => Chord.tokenize(chord)))
  ))

  return score
}

const setBeats = (length) => {
  switch (length) {
    case 1:  return [0]
    case 2:  return [0, 2]
    case 4:  return [0, 1, 2, 3]
    default: return [0]
  }
}

export const makeScore = (text) => {
  const score = []
  const fixNote = (notes) => notes.map(note => note.replace(/##/, "#"))
  const baseKey = 3
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

export const valueInRange = (value, min, max) => {
  if (value < min) return min
  if (max < value) return max
  return value
}

export const synthVelocity = (length) => 3.0 / length
