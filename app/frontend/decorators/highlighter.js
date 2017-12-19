import React       from "react"
import Highlighter from "react-highlight-words"

export const highlighter = (highlightWords) => (text) => (
  <Highlighter
    searchWords={highlightWords ? highlightWords.trim().split(/\s+/) : []}
    textToHighlight={text}
  />
)

export default highlighter
