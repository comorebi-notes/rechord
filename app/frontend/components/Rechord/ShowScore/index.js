import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"

import Score              from "../../Score"
import ScoreHeader        from "./ScoreHeader"
import scoreDecorator     from "../../../decorators/scoreDecorator"
import * as api           from "../../../api"
import * as utils         from "../../../utils"
import { DEFAULT_VOLUME } from "../../../constants"

export default class ShowScore extends Component {
  constructor(props) {
    super(props)
    const { currentUser } = props
    this.state = {
      loading:   true,
      error:     "",
      isPlaying: false,
      volume:    DEFAULT_VOLUME,
      userId:    currentUser && currentUser.id,
    }
  }
  componentDidMount() {
    const { token } = this.props.match.params
    api.showScore(
      { token },
      (success) => {
        const { score, author } = success.data
        const scoreContent = score.content
        const contentState = ContentState.createFromText(scoreContent)
        utils.setTitle(score.title)
        this.setState({
          loading:        false,
          inputText:      scoreContent,
          editorState:    EditorState.createWithContent(contentState, scoreDecorator),
          title:          score.title,
          enabledClick:   score.click,
          bpm:            score.bpm,
          beat:           score.beat,
          instrumentType: score.instrument,
          token:          score.token,
          createdAt:      score.created_at,
          author
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

  handleSetState = (newState) => this.setState(newState)

  render() {
    const {
      loading, error,
      inputText, title, editorState, beat, bpm, volume, instrumentType,
      isPlaying, enabledClick, author, userId, token, createdAt
    } = this.state
    const userPath = `/users/${userId}`
    const editPath = `/${token}/edit`
    const showEditButton = author && Object.keys(author).length > 0 && author.id === userId
    return (
      <div>
        {!loading && (
          error ? (
            <div>{error}</div>
          ) : (
            <div>
              <ScoreHeader
                title={title}
                author={author}
                token={token}
                userPath={userPath}
                editPath={editPath}
                createdAt={createdAt}
                showEditButton={showEditButton}
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
            </div>
          )
        )}
      </div>
    )
  }
}
