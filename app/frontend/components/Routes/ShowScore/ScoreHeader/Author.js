import React, { Component } from "react"
import { Link }             from "react-router-dom"
import * as path            from "../../../../utils/path"
import * as utils           from "../../../../utils"

export default class Author extends Component {
  render() {
    const { author, createdAt, updatedAt } = this.props
    const existAuthor = author && Object.keys(author).length > 0
    const authorPath = existAuthor && path.user.show(author.name)
    const iconBlock = (
      <figure className="image is-40x40">
        <img src={utils.iconUrl(author && author.icon, "thumb")} className="user-icon" alt="guest user" />
      </figure>
    )
    return (
      <div className="author">
        {existAuthor ? (
          <Link to={authorPath}>{iconBlock}</Link>
        ) : (
          iconBlock
        )}
        <div>
          <p>
            {existAuthor ? (
              <Link to={authorPath}>
                <strong>{author.screen_name}</strong>
              </Link>
            ) : (
              <strong>Guest User</strong>
            )}
          </p>
          <time className="created-at">
            {utils.humanDateTime(createdAt, true)} 投稿
          </time>
          {createdAt !== updatedAt && (
            <time className="updated-at">
              {utils.humanDateTime(updatedAt, true)} 更新
            </time>
          )}
        </div>
      </div>
    )
  }
}
