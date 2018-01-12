import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"
import classNames                    from "classnames"

import Score             from "../../Score"
import ScoreHeader       from "./ScoreHeader"
import ScoreFooter       from "./ScoreFooter"
import DestroyScoreModal from "./DestroyScoreModal"
import scoreDecorator    from "../../../decorators/scoreDecorator"
import * as api          from "../../../api"
import * as path         from "../../../utils/path"
import * as utils        from "../../../utils"
import { DEFAULT_BPM, DEFAULT_VOLUME, DEFAULT_INSTRUMENT_TYPE } from "../../../constants"

export default class ShowScore extends Component {
  constructor(props) {
    super(props)
    const { currentUser } = props
    this.state = {
      loading:        true,
      editorState:    EditorState.createEmpty(),
      isPlaying:      false,
      volume:         DEFAULT_VOLUME,
      bpm:            DEFAULT_BPM,
      instrumentType: DEFAULT_INSTRUMENT_TYPE,
      user:           currentUser || {}
    }
  }
  componentDidMount() {
    const { token } = this.props.match.params
    api.showScore(
      { token },
      (success) => {
        const { score, author, views_count: viewsCount } = success.data
        const scoreContent = score.content
        const contentState = ContentState.createFromText(scoreContent)
        utils.setTitle(score.title, this.props.history)
        this.setState({
          loading:        false,
          inputText:      scoreContent,
          editorState:    EditorState.createWithContent(contentState, scoreDecorator),
          scoreId:        score.id,
          title:          score.title,
          enabledClick:   score.click,
          bpm:            score.bpm,
          beat:           score.beat,
          status:         score.status,
          instrumentType: score.instrument,
          token:          score.token,
          favs:           score.favs,
          createdAt:      score.created_at,
          updatedAt:      score.updated_at,
          author,
          viewsCount
        })
      },
      () => this.props.history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
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
  handleToggleDestroyModal = () => this.setState({ destroyModal: !this.state.destroyModal })

  render() {
    const {
      loading, inputText, scoreId, title, editorState, beat, bpm, volume, status, instrumentType, isPlaying,
      enabledClick, author, viewsCount, user, token, favs, createdAt, updatedAt, destroyModal
    } = this.state
    const { history } = this.props
    const isOwn = author && Object.keys(author).length > 0 && author.id === user.id
    return (
      <div className={classNames({ "loading-wrapper": loading })}>
        <ScoreHeader
          scoreId={scoreId}
          title={title}
          author={author}
          status={status}
          token={token}
          viewsCount={viewsCount}
          favs={favs}
          user={user}
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
        {isOwn && (
          <ScoreFooter
            token={token}
            history={history}
            handleToggleDestroyModal={this.handleToggleDestroyModal}
          />
        )}
        {isOwn && (
          <DestroyScoreModal
            token={token}
            user={user}
            history={history}
            active={destroyModal}
            handleToggleDestroyModal={this.handleToggleDestroyModal}
          />
        )}
      </div>
    )
  }
}
