import axios, { config } from "./axios"

export const createScore = (params, onSuccess, onError) => {
  const { title, content, instrument, beat, bpm, click, status, userId } = params
  const scoreParams = {
    score: { title, content, instrument, beat, bpm, click, status, user_id: userId }
  }
  axios.post("/scores", scoreParams, config)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
}

export default createScore
