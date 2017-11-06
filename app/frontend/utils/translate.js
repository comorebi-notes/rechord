// support tonal-chord

const translate = (chordType) => {
  if (chordType === "add9")   return "Madd9"
  if (chordType === "dim")    return "o"
  if (chordType === "dim7")   return "o7"
  if (chordType === "m7-5")   return "m7b5"
  if (chordType === "+5")     return "M#5"
  if (chordType === "m7(11)") return "m7add11"
  if (chordType.match(/\(.+\)/)) {
    return chordType.replace(/\((.+)\)/, "$1")
  }
  return chordType
}

export default translate
