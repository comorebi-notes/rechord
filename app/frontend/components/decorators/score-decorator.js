import React                  from "react"
import { CompositeDecorator } from "draft-js"
import classNames             from "classnames"
import * as constantRegex     from "../../constants/regex"

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
  baseDecorator(constantRegex.separator, (props) => (
    <span className="separator">
      {props.children}
    </span>
  )),
  baseDecorator(constantRegex.rootChord, (props) => (
    <span className={rootClass(props.decoratedText)}>
      {props.children}
    </span>
  )),
  baseDecorator(constantRegex.whiteSpaces, () => (
    <span className="space">&nbsp;</span>
  )),
])

export default ScoreDecorator
