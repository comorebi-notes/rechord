import React, { Component } from "react"
import { Link }             from "react-router-dom"
import * as path            from "../../../../utils/path"

export default class ScoreFooter extends Component {
  render() {
    const { token, handleToggleDestroyModal } = this.props
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
            <button className="button is-danger is-medium" onClick={handleToggleDestroyModal}>
              <span className="icon">
                <i className="fa fa-ban" />
              </span>
              <span>delete</span>
            </button>
          </p>
        </div>
      </div>
    )
  }
}
