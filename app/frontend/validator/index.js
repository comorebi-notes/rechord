const validate = (error, message) => (error ? message : false)
const validates = {
  tooLongTitle: (value) => validate(value.length > 40, "タイトルが長すぎます。")
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
