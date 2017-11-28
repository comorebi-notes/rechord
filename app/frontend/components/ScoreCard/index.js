import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import LinkButton               from "../commons/LinkButton"
import * as utils               from "../../utils"

export default class ScoreCard extends PureComponent {
  render() {
    const { score: { title, token, status, created_at }, isOwn } = this.props
    const isClosed = status === "closed"
    const showScorePath = `/${token}`
    const editScorePath = `/${token}/edit`
    return (
      <Link to={showScorePath} className="score-card">
        <div className={classNames("box", { closed: isClosed })}>
          <article className="media">
            <div className="media-content">
              <div className="content">
                <h3 className="score-title">
                  {title}
                  {isClosed && (
                    <span className="icon is-small">
                      <i className="fa fa-lock" />
                    </span>
                  )}
                </h3>
                <p className="score-attributes">
                  <time className="created-at">
                    {utils.humanDateTime(created_at, true)}
                  </time>
                </p>
              </div>
            </div>
          </article>
          {false && isOwn && (
            <nav className="field is-grouped">
              <div className="control">
                <LinkButton to={editScorePath} icon="pencil-square-o" />
              </div>
              <div className="control">
                <LinkButton to={editScorePath} icon="trash" />
              </div>
            </nav>
          )}
        </div>
      </Link>
    )
  }
}
