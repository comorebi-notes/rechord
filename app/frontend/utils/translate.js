import { Note } from "tonal"

// support tonal-chord

const translate = (chordType) => {
  if (chordType === "add9")   return "Madd9"
  if (chordType === "mM7")    return "mMaj7"
  if (chordType === "m7-5")   return "m7b5"
  if (chordType === "dim")    return "o"
  if (chordType === "dim7")   return "o7"
  if (chordType === "+5")     return "M#5"
  if (chordType === "aug")    return "M#5"
  if (chordType === "m7(11)") return "m7add11"
  if (chordType.match(/\(.+\)/)) {
    return chordType.replace(/\((.+)\)/, "$1")
  }
  return chordType
}

// Chord.tokenize では9thコードが変換できないため自前で実装
export const tokenize = (name) => {
  const p = Note.tokenize(name)
  if (p[0] === "") return ["", name]

  if (p[0] !== "" && (p[2][0] === "6" || p[2][0] === "7" || p[2][0] === "9")) {
    return [p[0] + p[1], p[2] + p[3]]
  } else {
    return [p[0] + p[1] + p[2], p[3]]
  }
}

export default translate
