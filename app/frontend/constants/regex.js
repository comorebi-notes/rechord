export const rootChord   = /([CDEFGAB][#♯＃b♭ｂ]{0,2})|%|=|_|N.C./g
export const onChord     = /(\/|／|on)([CDEFGAB][#♯＃b♭ｂ]{0,2})/g
export const separator   = /[|｜lｌ]/g
export const whiteSpaces = /[ 　]+/g
export const comment     = /^[#♯].*$/g
export const chordType   = /(?![#♯b♭])(?:(?!on)[Ma-z0-9()（）,\-+#♯＃b♭ｂ△ΔΦφø])+/g

export const joinOnChord = /(\/|／|on) ([CDEFGAB][#♯＃b♭ｂ]{0,2})/g
