import React, { Component } from "react"
import * as api             from "../../api"
import * as utils           from "../../utils"

export default class SaveControl extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error:   ""
    }
  }
  handleClick = () => {
    const { update, userId, handleSetState, handleResetLocalStorage } = this.props
    const func = update ? "updateScore" : "createScore"
    this.setState({ loading: true })
    api[func](
      this.props,
      (success) => {
        const { title, token } = success.data
        // ログイン中かつ新規作成であれば保存以降はupdateのように振る舞う
        if (!update && userId) {
          utils.pushUrl(`/scores/${token}/edit`, title)
          handleSetState({ update: true })
        }
        handleSetState({ token, modal: true })
        if (handleResetLocalStorage) handleResetLocalStorage()
        this.setState({ loading: false, error: "" })
      },
      (error) => (
        this.setState({ loading: false, error: error.response.data })
      )
    )
  }
  render() {
    const { update, userId } = this.props
    const { loading, error } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    const buttonLabel = update ? "update & share" : "save & share"
    return (
      <div className="has-text-centered">
        <p>
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
        </p>
        {error.length > 0 && (
          <p className="has-text-danger" style={{ marginTop: 4 }}>{error}</p>
        )}
        {!userId && (
          <div className="notification is-size-7" style={{ marginTop: "1rem", display: "inline-block" }}>
            <span className="icon">
              <i className="fa fa-warning" />
            </span>
            ログインしていない場合、保存後のデータは編集できませんのでご注意ください。
          </div>
        )}
      </div>
    )
  }
}
