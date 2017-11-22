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
    const { userId, handleSetState, handleResetLocalStorage } = this.props
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
          utils.transitionUrl(`/scores/${token}`)
        }
      },
      (error) => (
        this.setState({ loading: false, error: error.response.data })
      )
    )
  }
  render() {
    const { userId } = this.props
    const { loading, error } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
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
            <span>save & share</span>
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
