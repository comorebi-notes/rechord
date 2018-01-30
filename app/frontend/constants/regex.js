const signature        = "[#♯＃b♭ｂ]{0,2}"
const scales           = "[CDEFGAB]"
const note             = `${scales}${signature}`
const onChordSeparator = "(\\/|／|on)"
const chordTypes       = "(?![#♯b♭])(?:(?!on)[Ma-z0-9()（）,\\-+#♯＃b♭ｂ△ΔΦφø])+"

export const rootChord   = new RegExp(`(${note})|%|=|_|N\\.C\\.`, "g")
export const onChord     = new RegExp(`${onChordSeparator}${note}`, "g")
export const chordType   = new RegExp(chordTypes, "g")
export const chord       = new RegExp(`^((${note}(${chordTypes})?(${onChordSeparator}${note})?)|%|=|_|N\\.C\\.)$`)
export const separator   = /[|｜lｌ]/g
export const whiteSpaces = /[ 　]+/g
export const comment     = /^[#♯].*$/g

export const joinOnChord = new RegExp(`${onChordSeparator} (${note})`, "g")
