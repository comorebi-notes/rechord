import axios, { config } from "./axios"

const getScoreParams = (params) => {
  const { title, content, instrument, beat, bpm, click, status, userId } = params
  return {
    score: { title, content, instrument, beat, bpm, click, status, user_id: userId }
  }
}

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
