import axios, { config } from "./axios"

const getScoreParams = (params) => {
  const { title, content, instrument, beat, bpm, click, status, userId } = params
  const scoreParams = {
    score: { title, content, instrument, beat, bpm, click, status }
  }
  if (userId) {
    scoreParams.score.user_id = userId
    scoreParams.flash = "Saved Successfully!"
  }
  return scoreParams
}

export const showScore = (params, onSuccess, onError) => (
  axios.get(`/scores/${params.token}`, null, config)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
)

export const editScore = (params, onSuccess, onError) => (
  axios.get(`/scores/${params.token}/edit`, null, config)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
)

export const createScore = (params, onSuccess, onError) => (
  axios.post("/scores", getScoreParams(params), config)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
)

export const updateScore = (params, onSuccess, onError) => (
  axios.put(`/scores/${params.token}`, getScoreParams(params), config)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
)

export default createScore
