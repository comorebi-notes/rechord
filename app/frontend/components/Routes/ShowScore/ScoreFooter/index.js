import React, { Component } from "react"
import { Link }             from "react-router-dom"
import ErrorMessages        from "../../../commons/ErrorMessages"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"

export default class ScoreFooter extends Component {
  constructor() {
    super()
    this.state = { error: "" }
  }
  handleClick = () => (
    api.updateScore(
      this.props,
      (success) => {
        const { token } = success.data
        this.props.history.push(path.score.show(token), { flash: ["success", "スコアが更新されました。"] })
      },
      (error) => (
        this.setState({ error: error.response.data })
      )
    )
  )
  render() {
    const { token, handleToggleDestroyModal } = this.props
    const { error } = this.state
    const editPath = path.score.edit(token)
    return (
      <div className="score-footer">
        <div className="field is-grouped">
          <p className="control">
            <Link to={editPath} className="button is-primary is-medium">
              <span className="icon">
                <i className="fa fa-edit" />
              </span>
              <span>edit</span>
            </Link>
          </p>
          <p className="control">
            <a
              className="button is-danger is-medium"
              role="presentation"
              onClick={handleToggleDestroyModal}
            >
              <span className="icon">
                <i className="fa fa-ban" />
              </span>
              <span>delete</span>
            </a>
          </p>
        </div>
        {error.length > 0 && <ErrorMessages error={error} />}
      </div>
    )
  }
}
