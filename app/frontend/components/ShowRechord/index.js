import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score              from "../Score"
import ScoreHeader        from "./ScoreHeader"
import scoreDecorator     from "../../decorators/scoreDecorator"
import { window }         from "../../utils/browser-dependencies"
import { DEFAULT_VOLUME } from "../../constants"

export default class ShowRechord extends Component {
  constructor() {
    super()
    const { score, author, currentUser } = window.data
    const scoreContent = score.content
    const contentState = ContentState.createFromText(scoreContent)
    this.state = {
      inputText:      scoreContent,
      editorState:    EditorState.createWithContent(contentState, scoreDecorator),
      isPlaying:      false,
      volume:         DEFAULT_VOLUME,
      title:          score.title,
      enabledClick:   score.click,
      bpm:            score.bpm,
      beat:           score.beat,
      instrumentType: score.instrument,
      url:            score.url,
      token:          score.token,
      createdAt:      score.created_at,
      updatedAt:      score.updated_at,
      userId:         currentUser && currentUser.id,
      author
    }
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

  handleSetState = (newState) => this.setState(newState)

  render() {
    const {
      inputText, title, editorState, beat, bpm, volume, instrumentType,
      isPlaying, enabledClick, url, author, userId, token, createdAt, updatedAt
    } = this.state
    const editPath = `/scores/${token}/edit`
    const showEditButton = Object.keys(author).length > 0 && author.id === userId
    return (
      <div>
        <ScoreHeader
          title={title}
          author={author}
          url={url}
          userId={userId}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />

        <Score
          hideLabel
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

        {showEditButton && (
          <div className="share has-text-centered" style={{ marginTop: "1.5rem" }}>
            <a href={editPath} className="button is-primary is-medium">
              <span className="icon">
                <i className="fa fa-edit" />
              </span>
              <span>edit</span>
            </a>
          </div>
        )}
      </div>
    )
  }
}
