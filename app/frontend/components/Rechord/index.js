import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score          from "../Score"
import SaveControl    from "../SaveControl"
import ShareModal     from "../ShareModal"
import Field          from "../shared/Field"
import scoreDecorator from "../../decorators/score-decorator"
import sampleScore    from "../../constants/sampleScore"
import { window }     from "../../utils/browser-dependencies"
import { DEFAULT_BPM, DEFAULT_VOLUME, DEFAULT_BEAT } from "../../constants"

export default class Rechord extends Component {
  constructor() {
    super()
    const { score } = window.data
    const scoreContent = score.content || sampleScore
    const contentState = ContentState.createFromText(scoreContent)
    this.state = {
      inputText:      scoreContent,
      editorState:    EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:      false,
      title:          score.title || "",
      enabledClick:   score.click || false,
      bpm:            score.bpm || DEFAULT_BPM,
      volume:         score.volume || DEFAULT_VOLUME,
      beat:           score.beat || DEFAULT_BEAT,
      instrumentType: score.instrument || "Piano"
    }
  }
  handleSetState = (state) => this.setState(state)
  handleSetTitle = (e) => this.setState({ title: e.target.value })

  render() {
    const {
      inputText, title, editorState, beat, bpm, volume,
      instrumentType, isPlaying, enabledClick, url, modal
    } = this.state
    return (
      <div>
        <Field label="Title">
          <input
            className="input"
            type="text"
            placeholder="title"
            value={title}
            onChange={this.handleSetTitle}
          />
        </Field>
        <Score
          inputText={inputText}
          editorState={editorState}
          instrumentType={instrumentType}
          beat={beat}
          bpm={bpm}
          volume={volume}
          enabledClick={enabledClick}
          isPlaying={isPlaying}
          handleSetState={this.handleSetState}
        />
        <SaveControl
          title={title}
          content={inputText}
          instrument={instrumentType}
          beat={beat}
          bpm={bpm}
          click={enabledClick}
          url={url}
          handleSetState={this.handleSetState}
        />
        <ShareModal
          url={url}
          isActive={modal}
          handleSetState={this.handleSetState}
        />
      </div>
    )
  }
}
