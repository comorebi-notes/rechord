import axios, { config } from "./axios"

export const createScore = (params, onSuccess, onError) => {
  const { title, content, instrument, beat, bpm, click } = params
  const scoreParams = {
    score: { title, content, instrument, beat, bpm, click }
  }
  axios.post("/scores", scoreParams, config)
    .then(results => onSuccess(results))
    .catch(error => onError(error))
}

export default createScore
