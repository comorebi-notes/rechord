import * as Chord from "tonal-chord"

export const parseChordProgression = (text) => {
  let score = []

  score = text.split("\n")
  score = score.filter(line => line[0] !== "#")
  score = score.map(line => line.split("|"))
  score = score.map(line => (
    line
      .map(chords => chords.trim())
      .filter(chords => chords !== "")
      .map(chords => chords.split(" "))
      .map(chords => chords.map(chord => Chord.tokenize(chord)))
  ))

  return score
}

export default parseChordProgression
