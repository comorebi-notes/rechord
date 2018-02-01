export const validate = (score, bpm) => {
  if (!score || score.length === 1) return false
  if (!bpm || Number(bpm) === 0) return false

  let hasError = false

  score.forEach((scoreItem) => {
    const { notes } = scoreItem
    if (!notes) hasError = true
  })
  return !hasError
}

export default validate
