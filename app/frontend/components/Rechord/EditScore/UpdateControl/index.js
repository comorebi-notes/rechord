import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import * as api             from "../../../../api"

class UpdateControl extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error:   ""
    }
  }
  handleClickUpdate = () => {
    const { history, handleGlobalState } = this.props
    this.setState({ loading: true })
    api.updateScore(
      this.props,
      (success) => {
        const { token } = success.data
        handleGlobalState({ flash: "スコアが更新されました。" })
        history.push(`/${token}`)
      },
      (error) => (
        this.setState({ loading: false, error: error.response.data })
      )
    )
  }
  render() {
    const { token } = this.props
    const { loading, error } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    const showPath = `/${token}`
    return (
      <div>
        <p>
          <Link
            to={showPath}
            className="button"
            onClick={this.handleClickCancenl}
            disabled={loading}
            style={{ margin: "0 .5em 1em 0" }}
          >
            <span className="icon">
              <i className="fa fa-undo" />
            </span>
            <span>cancel</span>
          </Link>
          <button
            className="button is-primary"
            onClick={this.handleClickUpdate}
            disabled={loading}
          >
            <span className="icon">
              <i className={iconClass} />
            </span>
            <span>update</span>
          </button>
        </p>
        {error.length > 0 && (
          <p className="has-text-danger" style={{ marginTop: 4 }}>{error}</p>
        )}
      </div>
    )
  }
}

export default withRouter(UpdateControl)
