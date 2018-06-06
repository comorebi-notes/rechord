export const signature        = "[#♯＃b♭ｂ]{0,2}"
export const scales           = "[CDEFGAB]"
export const note             = `${scales}${signature}`
export const specialNotes     = ["%", "=", "_", "<", ">", "N\\.C\\."]
export const onChordSeparator = "(\\/|／|on)"
export const chordTypes       = "(?![#♯b♭])(?:(?!(on|l))[Ma-z0-9()（）,\\-+#♯＃b♭ｂ△ΔΦφø])+"

export const rootChord   = new RegExp(`(${note})|${specialNotes.join("|")}`, "g")
export const onChord     = new RegExp(`${onChordSeparator}${note}`, "g")
export const chordType   = new RegExp(chordTypes, "g")
export const chord       = new RegExp(`^((${note}(${chordTypes})?(${onChordSeparator}${note})?)|${specialNotes.join("|")})$`)
export const separator   = /[|｜lｌ]/g
export const whiteSpaces = /[ 　]+/g
export const comment     = /^[#♯].*$/g
export const startMarker = /^<.*$/g
export const endMarker   = /^>.*$/g

export const markerLineTop  = /[<>]/
export const commentLineTop = /[#♯<>]/

export const joinOnChord = new RegExp(`${onChordSeparator} (${note})`, "g")
