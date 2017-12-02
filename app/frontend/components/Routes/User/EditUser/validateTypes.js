export const validateTypes = {
  name:       [["required"], ["maxLength", 16]],
  screenName: [["required"], ["maxLength", 32]],
  profile:    [["maxLength", 256]],
  site:       [["maxLength", 256]],
  icon:       [["maxLength", 256]]
}

export default validateTypes
