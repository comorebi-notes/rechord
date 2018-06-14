"use strict"

const Window       = window
const Document     = Window.document
const Navigator    = navigator
const Location     = Window.location
const History      = history
const formData     = FormData
const audioContext = Window.AudioContext || Window.webkitAudioContext

export { Window       as window }
export { Document     as document }
export { Navigator    as navigator }
export { Location     as location }
export { History      as history }
export { formData     as FormData }
export { audioContext as AudioContext }

const LocalStorage = localStorage || {
  getItem:    () => false,
  setItem:    () => false,
  removeItem: () => false
}
export { LocalStorage as localStorage }
