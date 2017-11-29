import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import StatusControl        from "../../../StatusControl"
import ErrorMessages        from "../../../commons/ErrorMessages"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"

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
        history.push(path.score.show(token), { flash: ["success", "スコアが更新されました。"] })
      },
      (error) => (
        this.setState({ loading: false, error: error.response.data })
      )
    )
  }
  render() {
    const { token, status, handleSetState } = this.props
    const { loading, error } = this.state
    const showPath = path.score.show(token)
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    return (
      <div className="score-footer">
        <StatusControl
          status={status}
          handleSetState={handleSetState}
        />
        <div className="field is-grouped" style={{ marginTop: ".7em" }}>
          <div className="control">
            <Link
              to={showPath}
              className="button is-medium"
              disabled={loading}
            >
              <span className="icon">
                <i className={iconClass} />
              </span>
              <span>cancel</span>
            </Link>
          </div>
          <div className="control">
            <a
              className="button is-primary is-medium"
              role="presentation"
              onClick={this.handleClick}
              disabled={loading}
            >
              <span className="icon">
                <i className={iconClass} />
              </span>
              <span>update</span>
            </a>
          </div>
        </div>
        {error.length > 0 && <ErrorMessages error={error} />}
      </div>
    )
  }
}

export default withRouter(UpdateControl)
