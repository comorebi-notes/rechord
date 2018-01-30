import { Note, Distance } from "tonal"
import moji               from "moji"
import * as regex         from "../constants/regex"
import { document }       from "../utils/browser-dependencies"

// Chord.tokenize では9thコードが変換できないため自前で実装
const tokenize = (_name) => {
  let name = _name
  name = name.replace(/[＃♯]/g,  "#")
  name = name.replace(/[♭ｂ]/g, "b")

  const validateChord = regex.chord.test(name)
  if (!validateChord) return ["", "parse-error"]

  const nameMatch = name.match(regex.rootChord)
  const splitPoint = nameMatch ? nameMatch[0].length : 0
  return [
    name.slice(0, splitPoint),
    name.slice(splitPoint)
  ]
}

export const parseChordProgression = (text) => {
  if (!text) return false
  return moji(text).convert("ZE", "HE").toString()
    // .replace(regex.whiteSpaces, "")
    .replace(regex.rootChord,   " $&")
    .replace(regex.joinOnChord, "$1$2")
    .split("\n")
    .filter(line => line[0] !== "#")
    .map(line => line.split(regex.separator))
    .map(line => (
      line[0][0] === "\n" ? line : (
        line
          .map(chords => chords.trim())
          .filter(chords => chords !== "")
          .map(chords => chords.split(regex.whiteSpaces))
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

const elements = document.getElementsByClassName("root")
const activeClassName = "active"

export const activateCurrentNotes = (index) => {
  const element = elements[index]
  const targetClassName  = element.className
  const targetClassNames = targetClassName.split(" ")

  if (!targetClassNames.find((className) => className === activeClassName)) {
    element.className += ` ${activeClassName}`
  }
}

export const deactivateCurrentNotes = (index) => {
  const element = elements[index]
  const targetClassName  = element.className
  const targetClassNames = targetClassName.split(" ")

  element.className = targetClassNames.filter((className) => className !== activeClassName).join(" ")
}

export const allDeactivateCurrentNotes = () => {
  Array.prototype.forEach.call(elements, (_element) => {
    const element = _element
    const targetClassName  = element.className
    const targetClassNames = targetClassName.split(" ")

    element.className = targetClassNames.filter((className) => className !== activeClassName).join(" ")
  })
}
