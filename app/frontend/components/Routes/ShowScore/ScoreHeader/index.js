import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import SharedButtons            from "../../../shared/SharedButtons"
import * as utils               from "../../../../utils"

export default class ScoreHeader extends PureComponent {
  render() {
    const { author, title, token, userPath, editPath, createdAt, showEditButton } = this.props
    const existAuthor = author && Object.keys(author).length > 0
    return (
      <div className="score-header">
        <div>
          <h1 className="title">{title}</h1>
          {existAuthor && (
            <Link to={userPath} className="author-name">
              <figure className="image is-24x24">
                <img src={author.icon_url} className="user-icon" alt={author.name} />
              </figure>
              <strong>@{author.name}</strong>
            </Link>
          )}
          <time className="created-at">
            {utils.humanDateTime(createdAt, true)}
          </time>
        </div>
        <div>
          <SharedButtons url={utils.sharedUrl(token)} title={title} asShow />
          {showEditButton && (
            <Link to={editPath} className="button is-primary is-medium">
              <span className="icon">
                <i className="fa fa-edit" />
              </span>
              <span>edit</span>
            </Link>
          )}
        </div>
      </div>
    )
  }
}
