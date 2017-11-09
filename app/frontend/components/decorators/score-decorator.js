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
      console.log(matchArr)
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

const ROOT_REGEX = /(^|\||\s+)(C#|Db|D#|Eb|F#|Gb|G#|Ab|A#|Bb|C|D|E|F|G|A|B)/g
const SEPARATOR_REGEX = /\|/g
const rootClass = (root) => classNames("root", root.replace("#", "s"))

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
])

export default ScoreDecorator
