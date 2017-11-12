import React                  from "react"
import { CompositeDecorator } from "draft-js"
import classNames             from "classnames"
import * as constantRegex     from "../../constants/regex"

const baseDecorator = (regex, block) => ({
  strategy: (contentBlock, callback) => {
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
  component: (props) => block(props)
})

const rootChordClass = (root) => (
  classNames(
    "root",
    root
      .replace("#", "s")
      .replace("%", "streak")
      .replace("-", "resume")
      .replace("_", "stop")
  )
)
const onChordClass = (onChord) => (
  classNames(
    "on-chord",
    onChord
      .replace("/", "")
      .replace("#", "s")
  )
)
const separatorComponent = (props) => (
  <span className="separator">
    &nbsp;{props.children}
    <wbr />
  </span>
)
const onChordComponent = (props) => (
  <span className={onChordClass(props.decoratedText)}>
    {props.children}
  </span>
)
const rootChordComponent = (props) => (
  <span className={rootChordClass(props.decoratedText)}>
    <wbr />
    {props.children}
  </span>
)
const whiteSpacesComponent = () => (
  <span className="space">&nbsp;</span>
)

const ScoreDecorator = new CompositeDecorator([
  baseDecorator(constantRegex.separator,   separatorComponent),
  baseDecorator(constantRegex.onChord,     onChordComponent),
  baseDecorator(constantRegex.rootChord,   rootChordComponent),
  baseDecorator(constantRegex.whiteSpaces, whiteSpacesComponent),
])

export default ScoreDecorator
