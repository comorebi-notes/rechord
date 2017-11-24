const validate = (error, message) => (error ? message : false)
const validates = {
  required: (value) => validate(!value || value.lenght > 0, "必須項目です"),
  tooLongTitle: (value) => validate(value.length > 40,   "タイトルが長すぎます。"),
  tooLongScore: (value) => validate(value.length > 1024, "スコアが長すぎます。")
}

export const validator = ({ key, value, types, setState, errors }) => {
  const errorsArray = []
  types.forEach(type => {
    const message = validates[type](value)
    if (message) errorsArray.push(message)
  })
  return setState({ errors: Object.assign(errors, { [key]: errorsArray }) })
}

export default validator
