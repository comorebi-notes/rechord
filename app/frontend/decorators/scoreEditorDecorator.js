import { Note, Distance } from "tonal"
import { tokenize }       from "../utils/translateChord"
import * as regex         from "../constants/regex"

export const parseChordProgression = (text) => {
  if (!text) return false
  return text
    .replace(regex.whiteSpaces, "")
    .replace(regex.rootChord,   " $&")
    .replace(regex.joinOnChord, "$1$2")
    .split("\n")
    .filter(line => line[0] !== "#")
    .map(line => line.split("|"))
    .map(line => (
      line[0][0] === "\n" ? line : (
        line
          .map(chords => chords.trim())
          .filter(chords => chords !== "")
          .map(chords => chords.split(/ +/))
          .map(chords => chords.map(chord => tokenize(chord)))
      )
    ))
}

export const keyChange = (progression, operation) => {
  const newProgression = []
  const lines = progression.split(/\n/)
  lines.forEach(line => {
    if (/\n|#/.test(line[0])) {
      newProgression.push(line)
    } else {
      const notesRegExp = /(^|\||\n)? *(C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|C|D|E|F|G|A|B)/g
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
