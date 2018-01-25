export const rootChord   = /C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|C|D|E|F|G|A|B|%|=|_/g
export const onChord     = /\/(C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|C|D|E|F|G|A|B)/g
export const separator   = /\|/g
export const whiteSpaces = / +/g
export const comment     = /^#.*$/g
export const chordType   = /.+/g

export const joinOnChord = /(\/) (C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|C|D|E|F|G|A|B)/g
