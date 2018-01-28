import { Note, Distance } from "tonal"
import chordTranslator    from "chord-translator"
import { beats }          from "../constants/beats"
import * as regex         from "../constants/regex"
import { STREAK_NOTE, RESUME_NOTE, STOP_NOTE, STOP_NOTE_2 } from "../constants"

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
  const keyAdjuster = () => (
    Note.midi(notes[0]) > Note.midi(`${denominator}${baseKey}`) ? 0 : -1
  )
  const newRoot = `${denominator}${baseKey + keyAdjuster()}`
  notes.unshift(newRoot)

  return notes
}

const fixNotes = (chord, baseKey) => {
  const root        = chord[0]
  const splitedType = chord[1].split(/\/|on/)
  const type        = splitedType[0]
  const denominator = splitedType[1]

  const notes = chordTranslator(root, type, baseKey)
  if (!notes) return false

  const maxNotes = 5
  const minNotes = 3

  if (notes.length > 0) {
    for (let i = notes.length - minNotes; i < maxNotes - minNotes; i += 1) {
      notes.push(upOctave(notes[i]))
    }
    if (denominator && denominator.length > 0 && denominator !== root) {
      addNewRootToNotes(notes, denominator, baseKey)
    }
  }
  console.log(notes)
  return notes.map(Note.simplify)
}

export const scoreMaker = (text, selectedTime) => {
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
          if (chord[1] === STOP_NOTE_2) return []
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

export default scoreMaker
