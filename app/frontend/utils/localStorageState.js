import { localStorage } from "./browser-dependencies"

const localStorageKey = "rechordState"
const commonKey = "rechord"

export const get = (key) => {
  if (!localStorage) return false

  const state = localStorage.getItem(key || localStorageKey)
  if (!state) return false

  return JSON.parse(state)
}

export const set = (state, key) => {
  if (!localStorage) return false

  const { update, title, inputText, enabledClick, beat, bpm, capo, volume, loop, instrumentType, status } = state
  if (update) return false

  return localStorage.setItem(key || localStorageKey, JSON.stringify({
    title, inputText, enabledClick, beat, bpm, capo, volume, loop, instrumentType, status
  }))
}

export const remove = (key) => {
  if (!localStorage) return false
  return localStorage.removeItem(key || localStorageKey)
}

export const visit = () => {
  if (!localStorage) return false
  return localStorage.setItem(commonKey, JSON.stringify({ isVisited: true }))
}
export const isVisited = () => {
  if (!localStorage) return false

  const state = JSON.parse(localStorage.getItem(commonKey))
  if (!state) return false

  return !!state.isVisited
}
