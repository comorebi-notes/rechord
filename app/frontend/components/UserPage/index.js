import React, { Component } from "react"
import { window }           from "../../utils/browser-dependencies"

export default class UserPage extends Component {
  render() {
    const { user, scores } = window.data
    const showPath = (token) => `/scores/${token}`
    const editPath = (token) => `/scores/${token}/edit`
    return (
      <div>
        {scores && scores.map(score => (
          <div className="box" key={score.id}>
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <p>
                    <a href={showPath(score.token)}>
                      <strong>{score.title}</strong>
                    </a>
                    <br />
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
    )
  }
}
