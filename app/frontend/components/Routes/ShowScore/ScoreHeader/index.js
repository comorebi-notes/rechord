import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import SharedButtons            from "../../../SharedButtons"
import * as path                from "../../../../utils/path"
import * as utils               from "../../../../utils"

export default class ScoreHeader extends PureComponent {
  render() {
    const { author, title, token, status, createdAt } = this.props
    const existAuthor = author && Object.keys(author).length > 0
    const authorPath = existAuthor && path.user.show(author.name)
    const isClosed = status === "closed"
    return (
      <div className="score-header">
        <div>
          <h1 className="title">
            {title}
            {isClosed && (
              <span className="icon is-small">
                <i className="fa fa-lock" />
              </span>
            )}
          </h1>
          {existAuthor && (
            <Link to={authorPath} className="author-name">
              <figure className="image is-24x24">
                <img src={author.icon.url} className="user-icon" alt={author.name} />
              </figure>
              <strong>{author.screen_name}</strong>
            </Link>
          )}
          <time className="created-at">
            {utils.humanDateTime(createdAt, true)}
          </time>
        </div>
        <SharedButtons url={utils.sharedUrl(token)} title={title} asShow />
      </div>
    )
  }
}
