import React, { PureComponent } from "react"
import SharedButtons            from "../../SharedButtons"
import * as utils               from "../../../utils"

export default class ScoreHeader extends PureComponent {
  render() {
    const { author, title, url, userId, createdAt } = this.props
    const userPath = `/users/${userId}`
    const existAuthor = Object.keys(author).length > 0
    return (
      <div className="score-header">
        <div>
          <h1 className="title">{title}</h1>
          {existAuthor && (
            <a href={userPath} className="author-name">
              <figure className="image is-32x32">
                <img src={author.icon_url} alt={author.name} />
              </figure>
              <strong>@{author.name}</strong>
            </a>
          )}
          <p className="created-at">
            {utils.humanDateTime(createdAt, true)}
          </p>
        </div>
        <SharedButtons url={utils.sharedUrl(url)} title={title} asShow />
      </div>
    )
  }
}
