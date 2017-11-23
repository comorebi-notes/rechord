import React, { Component } from "react"
import { withRouter }       from "react-router-dom"
import StatusControl        from "../../../StatusControl"
import ErrorMessages        from "../../../shared/ErrorMessages"
import * as api             from "../../../../api"

class CreateControl extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error:   ""
    }
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
          handleSetState({ token, modal: true })
          this.setState({ loading: false, error: "" })
        } else {
          history.push(`/${token}`, { flash: "スコアが作成されました。" })
        }
      },
      (error) => (
        this.setState({ loading: false, error: error.response.data })
      )
    )
  }
  render() {
    const { userId, status, handleSetState } = this.props
    const { loading, error } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    const buttonLabel = userId ? "save" : "save & share"
    return (
      <div className="score-footer">
        <div>
          {userId && (
            <StatusControl
              status={status}
              handleSetState={handleSetState}
            />
          )}
          {userId && <br />}
          <div className="save-control">
            <button
              className="button is-primary is-medium"
              onClick={this.handleClick}
              disabled={loading}
            >
              <span className="icon">
                <i className={iconClass} />
              </span>
              <span>{buttonLabel}</span>
            </button>
          </div>
        </div>

        {error.length > 0 && <ErrorMessages error={error} />}
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
      </div>
    )
  }
}

export default withRouter(CreateControl)
