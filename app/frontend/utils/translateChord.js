import { Chord, Note, Distance } from "tonal"

const translateType = (type) => {
  const notes = [0, 0, 0, null, null, null, null]
  let baseType = type
  let tension
  let omit

  const tensionRegex = /\((.*)\)/
  const tensionMatch = type.match(tensionRegex)
  if (tensionMatch) {
    tension = tensionMatch[1].replace(/\s+/g, "").split(",")
    baseType = baseType.replace(tensionRegex, "")
  }

  const omitRegex = /omit(\d+)/
  const omitMatch = type.match(omitRegex)
  if (omitMatch) {
    omit = omitMatch[1]
    baseType = baseType.replace(omitRegex, "")
  }

  const manipulateType = (regex) => {
    if (baseType.match(regex)) {
      baseType = baseType.replace(regex, "")
      return true
    } else {
      return false
    }
  }

  // base
  switch (true) {
    case manipulateType(/^M(?!(7|9|11|13))/): break
    case manipulateType(/^m(?!aj)/): notes[1] = -1; break
    case manipulateType(/aug/):      notes[2] = 1;  break
    case manipulateType(/Φ|φ/):      notes[1] = -1; notes[2] = -1; notes[3] = 0; break
  }
  // +-
  switch (true) {
    case manipulateType(/\+5|#5/): notes[2] = 1;  break
    case manipulateType(/-5|b5/):  notes[2] = -1; break
  }
  switch (true) {
    case manipulateType(/^6/):  notes[3] = -1; break
    case manipulateType(/^7/):  notes[3] = 0;  break
    case manipulateType(/^9/):  notes[3] = 0;  notes[4] = 0; break
    case manipulateType(/^11/): notes[3] = 0;  notes[4] = 0; notes[5] = 0; break
    case manipulateType(/^13/): notes[3] = 0;  notes[4] = 0; notes[5] = 0; notes[6] = 0; break
  }
  // sus
  switch (true) {
    case manipulateType(/sus4/): notes[1] = 1;  break
    case manipulateType(/sus2/): notes[1] = -2; break
  }
  // add
  switch (true) {
    case manipulateType(/add2/):  notes[4] = -12; break
    case manipulateType(/add9/):  notes[4] = 0;   break
    case manipulateType(/add4/):  notes[5] = -12; break
    case manipulateType(/add11/): notes[5] = 0;   break
    case manipulateType(/add6/):  notes[6] = -12; break
    case manipulateType(/add13/): notes[6] = 0;   break
  }
  // M
  switch (true) {
    case manipulateType(/(M|maj|△|Δ)7/):  notes[3] = 1; break
    case manipulateType(/(M|maj|△|Δ)9/):  notes[3] = 1; notes[4] = 0; break
    case manipulateType(/(M|maj|△|Δ)11/): notes[3] = 1; notes[4] = 0; notes[5] = 0; break
    case manipulateType(/(M|maj|△|Δ)13/): notes[3] = 1; notes[4] = 0; notes[5] = 0; notes[6] = 0; break
  }
  // dim
  switch (true) {
    case manipulateType(/^(dim|o)7/): notes[1] -= 1; notes[2] -= 1; notes[3] = -1; break
    case manipulateType(/^(dim|o)/):  notes[1] -= 1; notes[2] -= 1; break
  }
  // tension
  if (tension) baseType += tension.join("")
  if (manipulateType(/(#|\+)9/))  notes[4] = 1
  if (manipulateType(/(b|-)9/))   notes[4] = -1
  if (manipulateType(/9/))        notes[4] = 0
  if (manipulateType(/(#|\+)11/)) notes[5] = 1
  if (manipulateType(/(b|-)11/))  notes[5] = -1
  if (manipulateType(/11/))       notes[5] = 0
  if (manipulateType(/(#|\+)13/)) notes[6] = 1
  if (manipulateType(/(b|-)13/))  notes[6] = -1
  if (manipulateType(/13/))       notes[6] = 0
  // omit
  switch (omit) {
    case "1":  notes[0] = null; break
    case "3":  notes[1] = null; break
    case "5":  notes[2] = null; break
    case "7":  notes[3] = null; break
    case "9":  notes[4] = null; break
    case "11": notes[5] = null; break
    case "13": notes[6] = null; break
  }

  return notes
}

const transposer = (note, interval) => Note.fromMidi(Note.midi(note) + interval)

const buildChord = (root, baseNotes, translator) => {
  const notes = []
  const chord13 = Chord.notes(root, "13") // 13コードを基準にして音を足したり減らしたりする
  chord13.splice(5, 0, Distance.transpose(root, "M11")) // tonal の 13コードは 11th が omit されている

  for (let i = 0; i < 7; i += 1) {
    if (translator[i] !== null) notes.push(transposer(chord13[i], translator[i]))
  }
  return notes
}

const translateChord = (root, baseKey, type) => {
  const baseNotes = Chord.notes(`${root}${baseKey}`, "M")
  const notes = buildChord(`${root}${baseKey}`, baseNotes, translateType(type))
  return notes
}

// Chord.tokenize では9thコードが変換できないため自前で実装
export const tokenize = (name) => {
  const p = Note.tokenize(name)
  if (p[0] === "") return ["", name]

  if (p[0] !== "" && p[2].match(/^(6|7|9|11|13|-5)/)) {
    return [p[0] + p[1], p[2] + p[3]]
  } else {
    return [p[0] + p[1] + p[2], p[3]]
  }
}

export default translateChord
