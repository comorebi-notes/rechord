import { Chord, Note, Distance } from "tonal"
import translate           from "./translate"

export const parseChordProgression = (text) => {
  let score = []

  score = text.split("\n")
  score = score.map(line => line.split("|"))
  score = score.map(line => (
    line[0][0] === "#" ? line : (
      line
        .map(chords => chords.trim())
        .filter(chords => chords !== "")
        .map(chords => chords.split(/\s+/))
        .map(chords => chords.map(chord => Chord.tokenize(chord)))
    )
  ))
  return score
}

export const keyChange = (progression, operation) => {
  const newProgression = []
  const lines = progression.split(/\n/)
  lines.forEach(line => {
    if (line[0] === "#") {
      newProgression.push(line)
    } else {
      const notesRegExp = /(^|\||\n)?\s*(C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|C|D|E|F|G|A|B)/g
      const transposeNote = (note, p1, p2) => {
        const interval = operation === "up" ? "2m" : "-2m"
        const newNote = Note.simplify(Distance.transpose(p2, interval), false)
        return note.replace(p2, `___${newNote}`)
      }
      newProgression.push(line.replace(notesRegExp, transposeNote).replace(/___/g, ""))
    }
  })
  return newProgression.join("\n")
}

const setBeats = (length) => {
  switch (length) {
    case 1:  return [0]
    case 2:  return [0, 2]
    case 4:  return [0, 1, 2, 3]
    default: return [0]
  }
}

const fixNotes = (notes) => {
  const newNotes = notes.concat()
  const maxNotes = 5
  const minNotes = 3
  for (let i = notes.length - minNotes; i < maxNotes - minNotes; i += 1) {
    newNotes.push(Distance.transpose(notes[i], "8M"))
  }
  return newNotes.map(Note.simplify)
}

export const makeScore = (text) => {
  const score = []
  const baseKey = 3
  const resumeNote = "%"
  // const stopNote = "-"
  let bar = 0

  text.forEach(line => {
    if (typeof line[0][0] === "string") return false

    line.forEach(chords => {
      const beats = setBeats(chords.length)
      chords.forEach((chord, index) => {
        const time  = `${bar}:${beats[index]}:0`
        const notes = chord[1][0] === resumeNote ? resumeNote : (
          fixNotes(Chord.notes(`${chord[0]}${baseKey}`, translate(chord[1])))
        )
        score.push({ time, notes })
      })
      bar += 1
    })
    return true
  })
  score.push({ time: `${bar}:0:0`, notes: "fin" })
  return score
}

export const valueInRange = (value, min, max) => {
  if (value < min) return min
  if (max < value) return max
  return value
}
