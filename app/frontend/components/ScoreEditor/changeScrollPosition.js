import { document } from "../../utils/browser-dependencies"

let currentScrollWidth
let currentClientHeight
let isRightEnd

export const setCurrentPosition = () => {
  const editor        = document.getElementById("score-editor")
  const editorContent = document.getElementsByClassName("public-DraftEditor-content")[0]

  const { scrollWidth, clientWidth, scrollLeft } = editor
  const { clientHeight }                         = editorContent.children[0]

  currentScrollWidth  = scrollWidth
  currentClientHeight = clientHeight
  isRightEnd          = scrollWidth === clientWidth + scrollLeft
}

export const changeScrollPosition = () => {
  const editor        = document.getElementById("score-editor")
  const editorContent = document.getElementsByClassName("public-DraftEditor-content")[0]

  const { scrollWidth, clientWidth } = editor
  const { clientHeight }             = editorContent.children[0]

  if (isRightEnd && scrollWidth > clientWidth && scrollWidth > currentScrollWidth) {
    // 右端での文字入力時にエディタが overscroll したらエディタを右端にスクロール
    editor.scrollLeft = scrollWidth - clientWidth
  } else if (clientHeight !== currentClientHeight) {
    // 文字入力時に高さが変わったらエディタを左端にスクロール
    editor.scrollLeft = 0
  }
}
