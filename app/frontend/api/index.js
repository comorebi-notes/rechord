import axios, { config } from "./axios"
import * as path         from "../utils/path"

const request = (method, url, params, onSuccess, onError) => {
  const args = method === "delete" ? [url, config] : [url, params, config]
  axios[method](...args)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
}

// ======== Scores ========
const getScoreParams = (params) => {
  const { title, content, instrument, beat, bpm, click, status, userId } = params
  return {
    score: { title, content, instrument, beat, bpm, click, status, user_id: userId }
  }
}

export const showScore = (params, onSuccess, onError) => (
  request("get", path.score.api.show(params.token), null, onSuccess, onError)
)
export const editScore = (params, onSuccess, onError) => (
  request("get", path.score.api.edit(params.token), null, onSuccess, onError)
)
export const createScore = (params, onSuccess, onError) => (
  request("post", path.score.api.create(), getScoreParams(params), onSuccess, onError)
)
export const updateScore = (params, onSuccess, onError) => (
  request("put", path.score.api.update(params.token), getScoreParams(params), onSuccess, onError)
)
export const destroyScore = (params, onSuccess, onError) => (
  request("delete", path.score.api.destroy(params.token), null, onSuccess, onError)
)

// ======== Users ========
const getUserParams = (params) => {
  const { name, screenName, profile, icon, site, twitter } = params
  return {
    user: { name, screen_name: screenName, profile, icon, site, twitter }
  }
}

export const showUser = (params, onSuccess, onError) => (
  request("get", path.user.show(params.name), null, onSuccess, onError)
)
export const validUserName = (params, onSuccess, onError) => (
  request("post", path.user.validName(params.name), null, onSuccess, onError)
)
export const updateUser = (params, onSuccess, onError) => (
  request("put", path.user.update(params.originalName), getUserParams(params), onSuccess, onError)
)
export const updateUserIcon = (params, onSuccess, onError) => (
  request("put", path.user.updateIcon(params.name), params.icon, onSuccess, onError)
)
export const removeUserIcon = (params, onSuccess, onError) => (
  request("delete", path.user.removeIcon(params.name), null, onSuccess, onError)
)
export const destoryUser = (params, onSuccess, onError) => (
  request("delete", path.user.destroy(params.name), null, onSuccess, onError)
)
