import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import LinkButton               from "../commons/LinkButton"
import * as utils               from "../../utils"

export default class ScoreCard extends PureComponent {
  render() {
    const { score: { title, token, status, created_at }, isOwn } = this.props
    const showScorePath = `/${token}`
    const editScorePath = `/${token}/edit`
    return (
      <div className={classNames("box", { closed: status === "closed" })}>
        <Link to={showScorePath}>
          <article className="media">
            <div className="media-content">
              <div className="content">
                <h3 className="score-title">
                  {title}
                </h3>
                <p className="score-attributes">
                  <time className="created-at">
                    {utils.humanDateTime(created_at, true)}
                  </time>
                </p>
              </div>
            </div>
          </article>
        </Link>
        {isOwn && (
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
    )
  }
}
