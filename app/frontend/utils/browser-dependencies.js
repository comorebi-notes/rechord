"use strict"

const Window       = window
const Document     = Window.document
const Navigator    = navigator
const Location     = Window.location
const LocalStorage = localStorage
const History      = history
const formData     = FormData
const audioContext = Window.AudioContext || Window.webkitAudioContext

export { Window       as window }
export { Document     as document }
export { Navigator    as navigator }
export { Location     as location }
export { LocalStorage as localStorage }
export { History      as history }
export { formData     as FormData }
export { audioContext as AudioContext }
