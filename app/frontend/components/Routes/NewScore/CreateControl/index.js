import React, { Component } from "react"
import { withRouter }       from "react-router-dom"
import StatusControl        from "../../../StatusControl"
import TwitterTL            from "../../../commons/TwitterTL"
import ModalCard            from "../../../commons/ModalCard"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"
import * as utils           from "../../../../utils"

class CreateControl extends Component {
  constructor() {
    super()
    this.state = { loading: false, modal: false }
  }
  handleClick = () => {
    if (!this.props.userId) {
      this.setState({ modal: true })
    } else {
      this.createScore()
    }
  }
  createScore = () => {
    const { userId, handleSetState, handleResetLocalStorage, history } = this.props
    this.setState({ loading: true, modal: false })
    api.createScore(
      this.props,
      ({ data: { token } }) => {
        if (handleResetLocalStorage) handleResetLocalStorage()
        if (!userId) {
          handleSetState({ token, modal: true, errors: utils.setApiErrors() })
          this.setState({ loading: false })
        } else {
          history.push(path.score.show(token), { flash: ["success", "スコアが作成されました。"] })
        }
      },
      (error) => {
        handleSetState({ errors: utils.setApiErrors(error.response.data) })
        this.setState({ loading: false })
      }
    )
  }
  hideConfirmModal = () => this.setState({ modal: false })
  render() {
    const { userId, status, handleSetState, isValid } = this.props
    const { loading, modal } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    const buttonLabel = userId ? "Save" : "Save & Share"
    return (
      <div>
        <div className="score-footer">
          <div className="has-status-control">
            {userId && (
              <StatusControl
                status={status}
                handleSetState={handleSetState}
              />
            )}
            {userId && <br />}
            <div className="save-control">
              <button
                className="button is-primary is-medium animate-button"
                onClick={this.handleClick}
                disabled={loading || !isValid}
              >
                <span className="icon">
                  <i className={iconClass} />
                </span>
                <span>{buttonLabel}</span>
              </button>
            </div>
          </div>
          {!userId && (
            <div>
              <hr style={{ margin: "3rem 0" }} />
              <div className="box twitter-tl">
                <TwitterTL />
              </div>
            </div>
          )}
        </div>

        <ModalCard
          isActive={modal}
          title="確認"
          icon="info-circle"
          hasButtons
          handleClick={this.createScore}
          hideModal={this.hideConfirmModal}
        >
          現在ログインしていません。<br />
          ログインしていない状態で保存した場合、あとから編集や削除はできません。<br />
          本当に保存しますか？
        </ModalCard>
      </div>
    )
  }
}

export default withRouter(CreateControl)
