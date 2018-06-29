import { document } from "./browser-dependencies"

const MAX_DESCRIPTION_LENGTH = 300
const ORIGINAL_DESCRIPTION   = document.querySelector('[name="description"]').content

export const set = (text) => {
  const metatag = document.querySelector('[name="description"]')
  if (text && text.length > 0) {
    metatag.content = text.replace(/\n/g, "|").slice(0, MAX_DESCRIPTION_LENGTH)
  } else {
    metatag.content = ORIGINAL_DESCRIPTION
  }
}
export const reset = () => set(ORIGINAL_DESCRIPTION)
