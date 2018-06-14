import { localStorage } from "./browser-dependencies"

const localStorageKey = "rechordState"
const commonKey = "rechord"

export const get = (key) => {
  const state = localStorage.getItem(key || localStorageKey)
  if (!state) return false
  return JSON.parse(state || "{}")
}

export const set = (state, key) => {
  const { update, title, inputText, enabledClick, beat, bpm, capo, volume, loop, instrumentType, status } = state
  if (update) return false

  return localStorage.setItem(key || localStorageKey, JSON.stringify({
    title, inputText, enabledClick, beat, bpm, capo, volume, loop, instrumentType, status
  }))
}

export const remove = (key) => localStorage.removeItem(key || localStorageKey)

export const visit = () => {
  const state = JSON.parse(localStorage.getItem(commonKey) || "{}")
  const newState = Object.assign(state, { isVisited: true })
  return localStorage.setItem(commonKey, JSON.stringify(newState))
}
export const isVisited = () => {
  const state = JSON.parse(localStorage.getItem(commonKey) || "{}")
  return state.isVisited
}

export const setCurrentVersion = (version) => {
  const state = JSON.parse(localStorage.getItem(commonKey) || "{}")
  const newState = Object.assign(state, { currentVersion: version })
  return localStorage.setItem(commonKey, JSON.stringify(newState))
}
export const getCurrentVersion = () => {
  const state = JSON.parse(localStorage.getItem(commonKey) || "{}")
  return state.currentVersion
}
