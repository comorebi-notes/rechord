export const validateTypes = {
  name:       [["required"], ["maxLength", 16]],
  screenName: [["required"], ["maxLength", 32]],
  profile:    [["maxLength", 256]],
  siteUrl:    [["maxLength", 256]],
  iconUrl:    [["maxLength", 256]]
}

export default validateTypes
