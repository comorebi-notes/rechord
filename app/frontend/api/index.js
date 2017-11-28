import axios, { config } from "./axios"

const request = (method, url, params, onSuccess, onError) => (
  axios[method](url, params, config)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
)

const getScoreParams = (params) => {
  const { title, content, instrument, beat, bpm, click, status, userId } = params
  return {
    score: { title, content, instrument, beat, bpm, click, status, user_id: userId }
  }
}

export const showScore = (params, onSuccess, onError) => (
  request("get", `/scores/${params.token}`, null, onSuccess, onError)
)
export const editScore = (params, onSuccess, onError) => (
  request("get", `/scores/${params.token}/edit`, null, onSuccess, onError)
)
export const createScore = (params, onSuccess, onError) => (
  request("post", "/scores", getScoreParams(params), onSuccess, onError)
)
export const updateScore = (params, onSuccess, onError) => (
  request("put", `/scores/${params.token}`, getScoreParams(params), onSuccess, onError)
)

const getUserParams = (params) => {
  const { screenName, profile, iconUrl, siteUrl } = params
  return {
    user: { screen_name: screenName, profile, icon_url: iconUrl, site_url: siteUrl }
  }
}

export const showUser = (params, onSuccess, onError) => (
  request("get", `/users/${params.name}`, null, onSuccess, onError)
)

export const updateUser = (params, onSuccess, onError) => (
  request("put", `/users/${params.name}`, getUserParams(params), onSuccess, onError)
)
