const validate = (error, message) => (error ? message : false)
const validates = {
  required: (value) => validate(!value || value.lenght > 0, "blank"),
  maxLength: (value, length) => validate(value.length > length, "too_long"),
}

export const validator = ({ key, value, types, setState, errors }) => {
  const errorsArray = []
  types.forEach(type => {
    const [target, arg] = type
    const message = validates[target](value, arg)
    if (message) errorsArray.push(message)
  })
  return setState({ errors: Object.assign(errors, { [key]: errorsArray }) })
}

export default validator
