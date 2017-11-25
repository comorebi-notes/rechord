import React, { Component } from "react"
import classNames           from "classnames"
import { Link }             from "react-router-dom"
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
        console.log(success.data)
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
    const showScorePath = (token) => `/${token}`
    const editScorePath = (token) => `/${token}/edit`
    return (
      <div className={classNames({ "loading-wrapper": loading })}>
        <div className="columns">
          <div className="column is-one-third">
            <div className="card" style={{ boxShadow: "none" }}>
              <div className="card-image" style={{ padding: "0 1.5rem" }}>
                <figure className="image is-square">
                  <img
                    src={user.icon_url && user.icon_url.replace("_normal", "")}
                    className="user-icon"
                    alt={user.name}
                  />
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
                </div>
              </div>
            </div>
          </div>

          <div className="column">
            <h1 className="title is-4">Scores</h1>
            {scores && scores.map(score => (
              <div className="box" key={score.id}>
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <h3>
                        <Link to={showScorePath(score.token)}>
                          {score.title}
                        </Link>
                      </h3>
                      <p>
                        {["bpm", "beat", "instrument"].map(key => (
                          <small key={key} style={{ marginRight: "1em" }}>
                            {key}: {score[key]}
                          </small>
                        ))}
                      </p>
                    </div>
                    <nav className="level is-mobile">
                      <div className="level-left">
                        <a className="level-item">
                          <span className="icon is-small"><i className="fa fa-reply"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fa fa-retweet"></i></span>
                        </a>
                        <a className="level-item">
                          <span className="icon is-small"><i className="fa fa-heart"></i></span>
                        </a>
                      </div>
                    </nav>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
