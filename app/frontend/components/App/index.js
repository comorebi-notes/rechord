import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score          from "../Score"
import Field          from "../shared/Field"
import scoreDecorator from "../../decorators/score-decorator"
import sampleScore    from "../../constants/sampleScore"
import { DEFAULT_BPM, DEFAULT_VOLUME, DEFAULT_BEAT } from "../../constants"

export default class App extends Component {
  constructor() {
    super()
    const contentState = ContentState.createFromText(sampleScore)
    this.state = {
      inputText:      sampleScore,
      editorState:    EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:      false,
      enabledClick:   false,
      bpm:            DEFAULT_BPM,
      volume:         DEFAULT_VOLUME,
      beat:           DEFAULT_BEAT,
      instrumentType: "Piano"
    }
  }
  handleSetState = (state) => this.setState(state)

  render() {
    const { inputText, editorState, beat, bpm, volume, instrumentType, isPlaying, enabledClick } = this.state
    return (
      <div>
        <Field label="Title">
          <input className="input" type="text" placeholder="title" style={{ width: "50%" }} />
        </Field>
        <Field label="Comment">
          <input className="input" type="text" placeholder="comment" />
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
      </div>
    )
  }
}
