import React, { Component } from "react"
import classNames           from "classnames"
import ScoreCard            from "../../ScoreCard"
import LinkButton           from "../../commons/LinkButton"
import * as api             from "../../../api"
import * as utils           from "../../../utils"

export default class ShowUser extends Component {
  constructor() {
    super()
    this.state = { loading: true, user: {}, scores: [] }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    api.showUser(
      { id },
      (success) => {
        const { user, scores } = success.data
        utils.setTitle(user.name)
        this.setState({ loading: false, user, scores })
      },
      () => this.props.history.push("/", { flash: ["error", "読み込みに失敗しました。"] })
    )
  }
  render() {
    const { loading, user, scores } = this.state
    const { currentUser } = this.props
    return (
      <div className={classNames("show-user", { "loading-wrapper": loading })}>
        <div className="columns">
          <div className="column is-one-third">
            <div className="card" style={{ boxShadow: "none" }}>
              <div className="card-image" style={{ padding: "0 1.5rem" }}>
                <figure className="image is-square">
                  {user.icon_url ? (
                    <img
                      src={user.icon_url.replace("_normal", "")}
                      className="user-icon has-border"
                      alt={user.name}
                    />
                  ) : (
                    <div className="dummy-icon" />
                  )}
                </figure>
              </div>
              <div className="card-content">
                <h2 className="title is-3">
                  {user.name}
                </h2>
                <div className="content">
                  <p>
                    <span className="icon">
                      <i className="fa fa-twitter" />
                    </span>
                    {user.name}
                  </p>
                  <p>
                    <LinkButton
                      to="/logout"
                      text="edit"
                      color="primary"
                      customStyle={{ display: "block" }}
                      icon="pencil-square-o"
                    />
                  </p>
                  <p>
                    <a href="/logout" className="button is-danger" style={{ display: "block" }}>
                      <span className="icon">
                        <i className="fa fa-sign-out" />
                      </span>
                      <span>logout</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="column scores">
            <h1 className="title is-4">Scores</h1>
            {scores && scores.map(score => (
              <ScoreCard key={score.id} score={score} isOwn={user.id === currentUser.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
