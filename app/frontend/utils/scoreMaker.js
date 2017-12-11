import { Note, Distance }                      from "tonal"
import translateChord                          from "./translateChord"
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
  const distanceByRoot = Distance.semitones(notes[0], `${denominator}${baseKey}`)
  const keyAdjuster = () => {
    if (distanceByRoot > 4)         return -1
    if (distanceByRoot <= (4 - 12)) return 1
    return 0
  }
  const newRoot = `${denominator}${baseKey + keyAdjuster()}`

  // const distanceByNewRoot = Distance.semitones(notes[0], newRoot)
  // if (distanceByNewRoot > 0 && distanceByNewRoot <= 4) {
  //   // 1度と3度の構成音を削除して5度の構成音のオクターブ上を足す
  //   notes.splice(0, 2)
  //   notes.unshift(newRoot)
  //   notes.push(upOctave(notes[1]))
  // } else if (distanceByNewRoot > -4) {
  //   // 1度の構成音を削除
  //   notes.unshift(newRoot)
  //   notes.splice(1, 1)
  // } else {
  // 最低音に追加
  // notes.unshift(newRoot)
  // notes.pop()
  // }

  // 最低音に追加
  notes.unshift(newRoot)
  // notes.pop()

  return notes
}

const fixNotes = (chord, baseKey) => {
  const root        = chord[0]
  const denominator = chord[1].split("/")[1]
  const type        = chord[1].split("/")[0]
  const notes       = translateChord(root, baseKey, type)

  const maxNotes = 5
  const minNotes = 2

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
