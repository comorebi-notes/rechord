import { Note, Distance } from "tonal"
import * as regex         from "../constants/regex"

// Chord.tokenize では9thコードが変換できないため自前で実装
const tokenize = (name) => {
  const p = Note.tokenize(name)
  if (p[0] === "") return ["", name]

  if (p[0] !== "" && p[2].match(/^(6|7|9|11|13|-5)/)) {
    return [p[0] + p[1], p[2] + p[3]]
  } else {
    return [p[0] + p[1] + p[2], p[3]]
  }
}

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

const errorClassName = "parse-error"

export const addErrorClass = (_element) => {
  const element = _element
  const targetClassName  = element.className
  const targetClassNames = targetClassName.split(" ")

  // もう付いている場合は一度外して付ける
  if (targetClassNames.find((className) => className === errorClassName)) {
    element.className = targetClassNames.filter((className) => className !== errorClassName).join(" ")
  }
  element.className += ` ${errorClassName}`
}

export const removeErrorClass = (_element) => {
  if (!_element) return false

  const element = _element
  const targetClassName  = element.className
  const targetClassNames = targetClassName.split(" ")

  if (targetClassNames.find((className) => className === errorClassName)) {
    element.className = targetClassNames.filter((className) => className !== errorClassName).join(" ")
  }

  return true
}
