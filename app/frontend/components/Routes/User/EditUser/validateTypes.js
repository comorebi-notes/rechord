export const validateTypes = {
  name:       [["required"], ["maxLength", 16]],
  screenName: [["required"], ["maxLength", 32]],
  profile:    [["maxLength", 256]],
  site:       [["maxLength", 256], ["format", /^https?:\/\/([\w-]+\.)+[\w-]+((\/[\w- .?%&=]*)?)*$/]],
  twitter:    [["maxLength", 16],  ["format", /^[a-zA-Z0-9_]{1,15}$/]]
}

export default validateTypes
