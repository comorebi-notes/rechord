import React, { Component } from "react"
import { withRouter }       from "react-router-dom"
import StatusControl        from "../../../StatusControl"
import TwitterTL            from "../../../commons/TwitterTL"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"
import * as utils           from "../../../../utils"

class CreateControl extends Component {
  constructor() {
    super()
    this.state = { loading: false }
  }
  handleClick = () => {
    const { userId, handleSetState, handleResetLocalStorage, history } = this.props
    this.setState({ loading: true })
    api.createScore(
      this.props,
      (success) => {
        const { token } = success.data
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
  render() {
    const { userId, status, handleSetState, isValid } = this.props
    const { loading } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    const buttonLabel = userId ? "save" : "save & share"
    return (
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
            <div className="notification is-size-7">
              <span className="icon">
                <i className="fa fa-warning" />
              </span>
              ログインしていない場合、保存後のデータは編集できませんのでご注意ください。
            </div>
          </div>
        )}

        {!userId && (
          <div>
            <hr style={{ margin: "3rem 0" }} />
            <div className="box twitter-tl">
              <TwitterTL />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(CreateControl)
