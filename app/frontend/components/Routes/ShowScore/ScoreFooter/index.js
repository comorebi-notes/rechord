import React, { Component }   from "react"
import { Link }               from "react-router-dom"
import * as path              from "../../../../utils/path"
import * as localStorageState from "../../../../utils/localStorageState"

export default class ScoreFooter extends Component {
  handleClick = () => localStorageState.set(this.props.currentState, "editScore")
  render() {
    const { token, handleToggleDestroyModal } = this.props
    const editPath = path.score.edit(token)
    return (
      <div className="score-footer">
        <div className="field is-grouped">
          <p className="control">
            <Link to={editPath} className="button is-primary is-medium" onClick={this.handleClick}>
              <span className="icon">
                <i className="fa fa-edit" />
              </span>
              <span>Edit</span>
            </Link>
          </p>
          <p className="control">
            <button type="button" className="button is-danger is-medium" onClick={handleToggleDestroyModal}>
              <span className="icon">
                <i className="fa fa-ban" />
              </span>
              <span>Delete</span>
            </button>
          </p>
        </div>
      </div>
    )
  }
}
