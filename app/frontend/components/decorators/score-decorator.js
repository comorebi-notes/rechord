import React                  from "react"
import { CompositeDecorator } from "draft-js"
import classNames             from "classnames"

const baseDecorator = (regex, block) => ({
  strategy(contentBlock, callback) {
    const text = contentBlock.getText()
    let matchArr = regex.exec(text)
    let start
    let end
    while (matchArr !== null) {
      start = matchArr.index
      end = start + matchArr[0].length
      callback(start, end)
      matchArr = regex.exec(text)
    }
  },
  component(props) {
    return block(props)
  }
})

const ROOT_REGEX      = /C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|C|D|E|F|G|A|B|%|-|_/g
const SEPARATOR_REGEX = /\|/g
const SPACE_REGEX     = /\s+/g

const rootClass = (root) => (
  classNames(
    "root",
    root
      .replace("#", "s")
      .replace("%", "streak")
      .replace("-", "resume")
      .replace("_", "stop")
  )
)

const ScoreDecorator = new CompositeDecorator([
  baseDecorator(SEPARATOR_REGEX, (props) => (
    <span className="separator">
      {props.children}
    </span>
  )),
  baseDecorator(ROOT_REGEX, (props) => (
    <span className={rootClass(props.decoratedText)}>
      {props.children}
    </span>
  )),
  baseDecorator(SPACE_REGEX, () => (
    <span className="space">&nbsp;</span>
  )),
])

export default ScoreDecorator
