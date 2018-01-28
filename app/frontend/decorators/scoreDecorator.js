import React                  from "react"
import { CompositeDecorator } from "draft-js"
import classNames             from "classnames"
import { translateType }      from "chord-translator"
import moji                   from "moji"
import * as constants         from "../constants"
import * as constantRegex     from "../constants/regex"

const baseDecorator = (regex, block) => ({
  strategy: (contentBlock, callback) => {
    const text = moji(contentBlock.getText()).convert("ZE", "HE").toString()
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
    moji(root).convert("ZE", "HE").toString()
      .replace(/[#♯]/g,  "s")
      .replace(/[b♭]/g, "b")
      .replace(constants.STREAK_NOTE, "streak")
      .replace(constants.RESUME_NOTE, "resume")
      .replace(constants.STOP_NOTE,   "stop")
      .replace(constants.STOP_NOTE_2, "stop")
  )
)
const onChordClass = (onChord) => (
  classNames(
    "on-chord",
    moji(onChord).convert("ZE", "HE").toString()
      .replace(/(\/|on)/, "")
      .replace(/[#♯]/g,    "s")
      .replace(/[b♭]/g,   "b")
  )
)
const chordTypeClassName = (chordType) => (
  classNames("chord-type", {
    "parse-error": !translateType(moji(chordType).convert("ZE", "HE").toString())
  })
)

const commentComponent = (props) => (
  <span className="comment">
    {props.children}
  </span>
)
const separatorComponent = (props) => (
  <span className="separator">
    {props.children}
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
const whiteSpacesComponent = (props) => (
  <span className="space">
    {props.children}
  </span>
)
const chordTypeComponent = (props) => (
  <span className={chordTypeClassName(props.decoratedText)}>
    {props.children}
  </span>
)

const ScoreDecorator = new CompositeDecorator([
  baseDecorator(constantRegex.comment,     commentComponent),
  baseDecorator(constantRegex.separator,   separatorComponent),
  baseDecorator(constantRegex.onChord,     onChordComponent),
  baseDecorator(constantRegex.rootChord,   rootChordComponent),
  baseDecorator(constantRegex.whiteSpaces, whiteSpacesComponent),
  baseDecorator(constantRegex.chordType,   chordTypeComponent)
])

export default ScoreDecorator
