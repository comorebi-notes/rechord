export const rootChord   = /([CDEFGAB][#♯b♭]{0,2})|%|=|_|N.C./g
export const onChord     = /(\/|on)([CDEFGAB][#♯b♭]{0,2})/g
export const separator   = /[|｜l]/g
export const whiteSpaces = / +/g
export const comment     = /^#.*$/g
export const chordType   = /(?![#♯b♭])(?:(?!on)[Ma-z0-9(),\-+#♯b♭△ΔΦφø])+/g

export const joinOnChord = /(\/) ([CDEFGAB][#♯b♭]{0,2})/g
