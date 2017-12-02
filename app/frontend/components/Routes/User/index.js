import React, { Component } from "react"
import { Link }             from "react-router-dom"
import classNames           from "classnames"
import ShowUser             from "./ShowUser"
import EditUser             from "./EditUser"
import Icon                 from "./Icon"
import ScoreCard            from "../../ScoreCard"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"
import * as utils           from "../../../utils"

export default class User extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      user:    {},
      scores:  [],
      edit:    false
    }
  }
  componentDidMount() {
    const { name } = this.props.match.params
    api.showUser(
      { name },
      (success) => {
        const { user, scores } = success.data
        utils.setTitle(user.screen_name)
        this.setState({ loading: false, user, scores })
      },
      () => this.props.history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
    )
  }
  handleToggleEdit = () => this.setState({ edit: !this.state.edit })
  render() {
    const { loading, user, scores, edit } = this.state
    const { currentUser, history } = this.props
    const isOwn = user.id === currentUser.id
    return (
      <div className={classNames("show-user", { "loading-wrapper": loading })}>
        <div className="columns">
          <div className="column is-one-third">
            <div className={classNames("card", "user-page", { edit })}>
              <div className="card-image">
                <Icon user={user} isOwn={isOwn} />
              </div>
              {edit ? (
                <EditUser user={user} history={history} handleToggleEdit={this.handleToggleEdit} />
              ) : (
                <ShowUser user={user} isOwn={isOwn} handleToggleEdit={this.handleToggleEdit} />
              )}
            </div>
          </div>
          <div className="column scores">
            <h1 className="title is-4">
              Scores
              <Link to={path.root}>
                <span className="icon">
                  <i className="fa fa-plus-circle" />
                </span>
              </Link>
            </h1>
            {scores.length > 0 ? (
              scores.map(score => (
                <ScoreCard key={score.id} score={score} isOwn={isOwn} />
              ))
            ) : (
              <div className="box no-score">
                <div className="media-content">
                  <div className="content">
                    No scores.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
