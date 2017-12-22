import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import SharedButtons            from "../../../SharedButtons"
import * as path                from "../../../../utils/path"
import * as utils               from "../../../../utils"

export default class ScoreHeader extends PureComponent {
  render() {
    const { author, title, token, status, createdAt, updatedAt } = this.props
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
                <img src={utils.iconUrl(author.icon, "thumb")} className="user-icon" alt={author.name} />
              </figure>
              <strong>{author.screen_name}</strong>
            </Link>
          )}
          <time className="created-at">
            作成日時 : <strong>{utils.humanDateTime(createdAt, true)}</strong>
          </time>
          {createdAt !== updatedAt && (
            <time className="updated-at">
              更新日時 : <strong>{utils.humanDateTime(updatedAt, true)}</strong>
            </time>
          )}
        </div>
        <div>
          <SharedButtons url={utils.sharedUrl(token)} title={title} asShow />
          <div className="fav" style={{ marginTop: "1em" }}>
            <span className="icon is-large">
              <i className="fa fa-star fa-3x" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}
