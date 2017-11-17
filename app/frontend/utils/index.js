import { Chord, Note, Distance }               from "tonal"
import translate, { tokenize }                 from "./translate"
import { STREAK_NOTE, RESUME_NOTE, STOP_NOTE } from "../constants"
import { beats }                               from "../constants/beats"
import * as regex                              from "../constants/regex"

export const parseChordProgression = (text) => {
  let score = []

  score = text
    .replace(regex.rootChord, " $&")
    .replace(regex.joinOnChord, "$1$2")
    .split("\n")
    .filter(line => line[0] !== "#")
    .map(line => line.split("|"))
    .map(line => (
      line[0][0] === "\n" ? line : (
        line
          .map(chords => chords.trim())
          .filter(chords => chords !== "")
          .map(chords => chords.split(/\s+/))
          .map(chords => chords.map(chord => tokenize(chord)))
      )
    ))
  return score
}

export const keyChange = (progression, operation) => {
  const newProgression = []
  const lines = progression.split(/\n/)
  lines.forEach(line => {
    if (line[0] === "\n") {
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

const setBeatPositions = (length, selectedBeat) => {
  if (length === 1) return [0]

  const beat = beats[selectedBeat][0]
  const beatPositions = []

  if (beat / length >= 2) {
    for (let i = 0; i < beat; i += 1) {
      if (i % length === 0) beatPositions.push(i)
    }
  } else {
    for (let i = 0; i < beat; i += 1) {
      beatPositions.push(i)
    }
  }
  return beatPositions
}

const upOctave = (note) => Distance.transpose(note, "8M")
const addNewRootToNotes = (notes, denominator, baseKey) => {
  const distanceByRoot = Distance.semitones(notes[0], `${denominator}${baseKey}`)
  const keyAdjuster = () => {
    if (distanceByRoot > 4)         return -1
    if (distanceByRoot <= (4 - 12)) return 1
    return 0
  }
  const newRoot = `${denominator}${baseKey + keyAdjuster()}`
  const distanceByNewRoot = Distance.semitones(notes[0], newRoot)

  if (distanceByNewRoot > 0 && distanceByNewRoot <= 4) {
    // 1度と3度の構成音を削除して5度の構成音のオクターブ上を足す
    notes.splice(0, 2)
    notes.unshift(newRoot)
    notes.push(upOctave(notes[1]))
  } else if (distanceByNewRoot > -4) {
    // 1度の構成音を削除
    notes.unshift(newRoot)
    notes.splice(1, 1)
  } else {
    // 最低音に追加
    notes.unshift(newRoot)
    notes.pop()
  }
  return notes
}

const fixNotes = (chord, baseKey) => {
  const root        = chord[0]
  const denominator = chord[1].split("/")[1]
  const type        = chord[1].split("/")[0]
  const notes       = Chord.notes(`${root}${baseKey}`, translate(type))

  const maxNotes = 5
  const minNotes = 3
  for (let i = notes.length - minNotes; i < maxNotes - minNotes; i += 1) {
    notes.push(upOctave(notes[i]))
  }
  if (denominator && denominator.length > 0 && denominator !== root) {
    addNewRootToNotes(notes, denominator, baseKey)
  }
  return notes.map(Note.simplify)
}

export const makeScore = (text, selectedTime) => {
  const score = []
  const baseKey = 3
  let bar = 0

  text.forEach(line => {
    if (!line) return false

    line.forEach(chords => {
      const beatPositions = setBeatPositions(chords.length, selectedTime)
      chords.forEach((chord, index) => {
        if (beatPositions.length <= index) return false

        const time = `${bar}:${beatPositions[index]}:0`
        const notes = () => {
          switch (chord[1][0]) {
            case STREAK_NOTE: return STREAK_NOTE
            case RESUME_NOTE: return RESUME_NOTE
            case STOP_NOTE:   return []
            default:          return fixNotes(chord, baseKey)
          }
        }
        return score.push({ time, notes: notes() })
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

export const barLength = (score) => (
  parseInt(score[score.length - 2].time.split(":")[0], 10) // fin の直前の小節
)
