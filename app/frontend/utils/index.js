import * as br from "./browser-dependencies"

export const valueInRange = (value, min, max) => {
  if (value < min) return min
  if (max < value) return max
  return value
}

export const barLength = (score) => (
  parseInt(score[score.length - 2].time.split(":")[0], 10) // fin の直前の小節
)

export const protocol = () => (/^https:/.test(br.location.href) ? "https" : "http")
export const sharedUrl = (url) => `${protocol()}://${br.location.host}/${url}`

export const copyToClipboard = (text) => {
  const { document } = br

  const temp = document.createElement("div")
  temp.appendChild(document.createElement("pre")).textContent = text

  const { style } = temp
  style.position = "fixed"
  style.left     = "-100%"

  document.body.appendChild(temp)
  document.getSelection().selectAllChildren(temp)

  const result = document.execCommand("copy")

  document.body.removeChild(temp)
  return result
}
