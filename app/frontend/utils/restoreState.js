import { localStorage } from "./browser-dependencies"

const localStorageKey = "rechordState"

export const get = () => {
  if (!localStorage) return false

  const state = localStorage.getItem(localStorageKey)
  if (!state) return false

  return JSON.parse(state)
}

export const set = (state) => {
  if (!localStorage) return false

  const { title, inputText, enabledClick, bpm, volume, beat, instrumentType, status } = state
  return localStorage.setItem(localStorageKey, JSON.stringify({
    title, inputText, enabledClick, bpm, volume, beat, instrumentType, status
  }))
}

export const remove = () => {
  if (!localStorage) return false
  return localStorage.removeItem(localStorageKey)
}
