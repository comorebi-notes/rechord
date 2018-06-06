export const getSelectedText = (contentState, selection) => {
  const startKey = selection.getStartKey()
  const endKey   = selection.getEndKey()
  const blocks   = contentState.getBlockMap()

  let reachedEndOfBlock = false
  const selectedBlock = blocks
    .skipUntil((block) => block.getKey() === startKey)
    .takeUntil((block) => {
      if (reachedEndOfBlock) return true
      if (block.getKey() === endKey) reachedEndOfBlock = true
      return false
    })

  const selectedText = selectedBlock.map((block) => {
    const key   = block.getKey()
    const text  = block.getText()
    const start = (key === startKey) ? selection.getStartOffset() : 0
    const end   = (key === endKey)   ? selection.getEndOffset()   : text.length

    return text.slice(start, end)
  }).join("\n")

  return selectedText
}

export default getSelectedText
