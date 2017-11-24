import React, { Component }          from "react"
import { EditorState, ContentState } from "draft-js"
import { Link }                      from "react-router-dom"
import classNames                    from "classnames"

import Score          from "../../Score"
import TitleControl   from "../../TitleControl"
import UpdateControl  from "./UpdateControl"
import scoreDecorator from "../../../decorators/scoreDecorator"
import * as api       from "../../../api"
import * as utils     from "../../../utils"
import { DEFAULT_BPM, DEFAULT_VOLUME } from "../../../constants"

export default class EditScore extends Component {
  constructor(props) {
    super(props)
    const { currentUser } = props
    this.state = {
      loading:        true,
      editorState:    EditorState.createEmpty(),
      isPlaying:      false,
      volume:         DEFAULT_VOLUME,
      bpm:            DEFAULT_BPM,
      instrumentType: "Piano",
      userId:         currentUser && currentUser.id,
      errors:         {}
    }
  }
  componentDidMount() {
    const { token } = this.props.match.params
    api.editScore(
      { token },
      (success) => {
        const { score } = success.data
        const contentState = ContentState.createFromText(score.content)
        utils.setTitle(score.title)
        this.setState({
          loading:        false,
          inputText:      score.content,
          editorState:    EditorState.createWithContent(contentState, scoreDecorator),
          title:          score.title,
          enabledClick:   score.click,
          bpm:            score.bpm,
          beat:           score.beat,
          status:         score.status,
          instrumentType: score.instrument,
          token:          score.token
        })
      },
      () => this.props.history.push("/", { flash: ["error", "読み込みに失敗しました。"] })
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
      loading, errors, inputText, title, editorState, beat, bpm, volume,
      instrumentType, isPlaying, enabledClick, status, userId, token
    } = this.state
    const showPath = `/${token}`
    return (
      <div className={classNames({ "loading-wrapper": loading })}>
        <p>
          <Link to={showPath} className="button" style={{ marginBottom: "2rem" }}>
            <span className="icon">
              <i className="fa fa-undo" />
            </span>
            <span>back</span>
          </Link>
        </p>

        <TitleControl
          title={title}
          errors={errors}
          handleSetState={this.handleSetState}
        />
        <Score
          inputText={inputText}
          editorState={editorState}
          instrumentType={instrumentType}
          beat={beat}
          bpm={bpm}
          volume={volume}
          enabledClick={enabledClick}
          isPlaying={isPlaying}
          errors={errors}
          setInputText={this.setInputText}
          handleSetState={this.handleSetState}
        />
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
      </div>
    )
  }
}
