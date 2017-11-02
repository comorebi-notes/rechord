import * as Chord from "tonal-chord"

export const parseChordProgression = (text) => {
  let progression = []

  progression = text.split("\n")
  progression = progression.filter(line => line[0] !== "#")
  progression = progression.map(line => line.split("|"))
  progression = progression.map(line => (
    line
      .map(chords => chords.trim())
      .filter(chords => chords !== "")
      .map(chords => chords.split(" "))
      .map(chords => chords.map(chord => Chord.tokenize(chord)))
  ))

  return progression
}

export default parseChordProgression
