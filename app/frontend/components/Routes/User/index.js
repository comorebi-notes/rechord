import React, { Component } from "react"
import classNames           from "classnames"
import ShowUser             from "./ShowUser"
import EditUser             from "./EditUser"
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
            {edit ? (
              <EditUser user={user} history={history} handleToggleEdit={this.handleToggleEdit} />
            ) : (
              <ShowUser user={user} isOwn={isOwn} handleToggleEdit={this.handleToggleEdit} />
            )}
          </div>
          <div className="column scores">
            <h1 className="title is-4">Scores</h1>
            {scores && scores.map(score => (
              <ScoreCard key={score.id} score={score} isOwn={isOwn} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
