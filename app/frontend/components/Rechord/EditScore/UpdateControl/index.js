import React, { Component } from "react"
import { withRouter }       from "react-router-dom"
import StatusControl        from "../../../StatusControl"
import ErrorMessages        from "../../../shared/ErrorMessages"
import * as api             from "../../../../api"

class UpdateControl extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error:   ""
    }
  }
  handleClick = () => {
    const { history } = this.props
    this.setState({ loading: true })
    api.updateScore(
      this.props,
      (success) => {
        const { token } = success.data
        history.push(`/${token}`, { flash: ["success", "スコアが更新されました。"] })
      },
      (error) => (
        this.setState({ loading: false, error: error.response.data })
      )
    )
  }
  render() {
    const { status, handleSetState } = this.props
    const { loading, error } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    return (
      <div className="score-footer">
        <div>
          <StatusControl
            status={status}
            handleSetState={handleSetState}
          />
          <br />
          <div className="save-control">
            <button
              className="button is-primary is-medium"
              onClick={this.handleClick}
              disabled={loading}
            >
              <span className="icon">
                <i className={iconClass} />
              </span>
              <span>update</span>
            </button>
          </div>
        </div>
        {error.length > 0 && <ErrorMessages error={error} />}
      </div>
    )
  }
}

export default withRouter(UpdateControl)
