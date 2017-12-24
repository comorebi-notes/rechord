import { Note, Distance }                      from "tonal"
import chordTranslator                         from "chord-translator"
import { STREAK_NOTE, RESUME_NOTE, STOP_NOTE } from "../constants"
import { beats }                               from "../constants/beats"

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
  const denominator = chord[1].split("/")[1]
  const type        = chord[1].split("/")[0]
  const notes       = chordTranslator(root, type, baseKey)

  const maxNotes = 5
  const minNotes = 3

  if (notes.length > 0) {
    if (denominator && denominator.length > 0 && denominator !== root) {
      addNewRootToNotes(notes, denominator, baseKey)
    }
    for (let i = notes.length - minNotes; i < maxNotes - minNotes; i += 1) {
      notes.push(upOctave(notes[i]))
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
