// import { document }                        from "../../../utils/browser-dependencies"
// import { addErrorClass, removeErrorClass } from "../../../decorators/scoreEditorDecorator"

export const validate = (score) => {
  let hasError = false
  // const noteElements = document.getElementById("score-editor").getElementsByClassName("root")

  score.forEach((scoreItem) => {
    const { notes } = scoreItem
    // const element   = noteElements[index]
    if (!notes) {
      hasError = true
      // addErrorClass(element)
    } else {
      // removeErrorClass(element)
    }
  })
  return !hasError
}

export default validate
