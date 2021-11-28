import { Note, Distance } from "tonal"
import chordTranslator    from "chord-translator"
import { times }          from "."
import { beats }          from "../constants/beats"
import { STREAK_NOTE, RESUME_NOTE, STOP_NOTE, STOP_NOTE_2, START_MARKER, END_MARKER } from "../constants"

const setBeatPositions = (length, selectedBeat) => {
  if (length === 1) return [[0, 0]]

  const beat = beats[selectedBeat][0]
  const beatPositions = []

  // 例: 4/4 の場合
  switch (true) {
    // コード数が 2 (均等に配置)
    case beat / length >= 2: {
      const timing = parseInt(beat / length, 10)
      times(beat)(i => (
        (i % timing === 0) && beatPositions.push([i, 0])
      ))
      break
    }
    // コード数が 5〜8 (8分音符)
    case length > beat && length <= beat * 2:
      times(beat)(i => (
        times(2)(j => beatPositions.push([i, j * 2]))
      ))
      break
    // コード数が 9〜16 (16分音符)
    case length > beat * 2:
      times(beat)(i => (
        times(4)(j => beatPositions.push([i, j]))
      ))
      break
    // コード数が 3〜4 (4分音符)
    default: times(beat)(i => beatPositions.push([i, 0]))
  }
  return beatPositions
}

const noteDuration = (length, selectedBeat) => {
  if (length === 1) return '1'

  const beat = beats[selectedBeat][0]

  switch (true) {
    // コード数が 2 (均等に配置)
    case beat / length >= 2: {
      return '2'
    }
    // コード数が 5〜8 (8分音符)
    case length > beat && length <= beat * 2:
      return '8'
    // コード数が 9〜16 (16分音符)
    case length > beat * 2:
      return '16'
    // コード数が 3〜4 (4分音符)
    default: return '4'
  }
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
  // console.log(notes)
  return notes.map(Note.simplify)
}

export const scoreMaker = (text, selectedTime) => {
  const baseKey = 3
  let score = []
  let bar = 0
  let notesIndex = 0
  let endOfScore = false

  text.forEach(line => {
    if (!line) return false

    line.forEach((chords) => {
      if (endOfScore) return false
      switch (true) {
        case chords[0][0] === START_MARKER:
          bar = 0
          score = []
          return false
        case chords[0][0] === END_MARKER:
          score.push({ time: `${bar}:0:0`, notes: END_MARKER })
          endOfScore = true
          return false
        default: {
          const beatPositions = setBeatPositions(chords.length, selectedTime)
          chords.forEach((chord, index) => {
            if (beatPositions.length <= index) return score.push({ notes: false })

            const [beat, sixteenth] = beatPositions[index]
            const time = `${bar}:${beat}:${sixteenth}`
            const notes = () => {
              if (chord[0].length > 0) notesIndex += 1
              switch (chord[0]) {
                case STREAK_NOTE:  return STREAK_NOTE
                case RESUME_NOTE:  return RESUME_NOTE
                case STOP_NOTE:    return []
                case STOP_NOTE_2:  return []
                default:           return fixNotes(chord, baseKey)
              }
            }
            return score.push({
              time,
              duration: noteDuration(chords.length, selectedTime),
              notes: notes(),
              index: notesIndex - 1
            })
          })
          bar += 1
          return true
        }
      }
    })
    return true
  })
  if (!endOfScore) score.push({ time: `${bar}:0:0`, notes: END_MARKER })
  return score
}

export default scoreMaker
