import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score              from "../../Score"
import StatusControl      from "../../StatusControl"
import UpdateControl      from "../../UpdateControl"
import ShareModal         from "../../ShareModal"
import Field              from "../../shared/Field"
import scoreDecorator     from "../../../decorators/scoreDecorator"
import * as api           from "../../../api"
import { window }         from "../../../utils/browser-dependencies"
import { DEFAULT_VOLUME } from "../../../constants"

export default class EditScore extends Component {
  constructor() {
    super()
    const { currentUser } = window.data
    this.state = {
      loading:   true,
      error:     "",
      isPlaying: false,
      volume:    DEFAULT_VOLUME,
      userId:    currentUser && currentUser.id
    }
  }
  componentDidMount() {
    const { token } = this.props.match.params
    api.editScore(
      { token },
      (success) => {
        const { score } = success.data
        const contentState = ContentState.createFromText(score.content)
        this.setState({
          loading:        false,
          error:          "",
          inputText:      score.content,
          editorState:    EditorState.createWithContent(contentState, scoreDecorator),
          title:          score.title,
          enabledClick:   score.click,
          bpm:            score.bpm,
          beat:           score.beat,
          status:         score.status,
          instrumentType: score.instrument,
          token:          score.token,
        })
      },
      (error) => this.setState({ loading: false, error: error.response.data })
    )
  }

  setEditorState = (inputText) => {
    const contentState = ContentState.createFromText(inputText)
    return EditorState.push(this.state.editorState, contentState)
  }
  setInputText = (nextInputText, setEditorState = true) => {
    this.handleSetState({ inputText: nextInputText })
    if (setEditorState) {
      this.setState({ editorState: this.setEditorState(nextInputText) })
    }
  }

  handleSetTitle = (e) => this.handleSetState({ title: e.target.value })
  handleSetState = (newState) => this.setState(newState)

  render() {
    const {
      loading, error,
      inputText, title, editorState, beat, bpm, volume, instrumentType,
      isPlaying, enabledClick, status, userId, modal, token
    } = this.state
    return (
      <div>
        {!loading && (
          error ? (
            <div>{error}</div>
          ) : (
            <div>
              <UpdateControl
                title={title}
                content={inputText}
                instrument={instrumentType}
                beat={beat}
                bpm={bpm}
                click={enabledClick}
                status={status}
                userId={userId}
                token={token}
                handleSetState={this.handleSetState}
              />
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
                setInputText={this.setInputText}
                handleSetState={this.handleSetState}
              />
              <StatusControl
                status={status}
                handleSetState={this.handleSetState}
              />
            </div>
          )
        )}
        <ShareModal
          token={token}
          title={title}
          isActive={modal}
          handleSetState={this.handleSetState}
        />
      </div>
    )
  }
}
