import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import SharedButtons            from "../../../SharedButtons"
import * as path                from "../../../../utils/path"
import * as utils               from "../../../../utils"

export default class ScoreHeader extends PureComponent {
  render() {
    const { author, viewsCount, title, token, status, createdAt, updatedAt } = this.props
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

          <div className="author">
            <figure className="image is-40x40">
              <img src={utils.iconUrl(author && author.icon, "thumb")} className="user-icon" alt="guest user" />
            </figure>
            <div>
              <p>
                {existAuthor ? (
                  <Link to={authorPath}>
                    <strong>{author.screen_name}</strong>
                  </Link>
                ) : (
                  <strong>guest user</strong>
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

          <div className="others">
            <div className="counter">
              <span className="icon">
                <i className="fa fa-eye" />
              </span>
              <span>{viewsCount ? utils.addCommas(viewsCount) : 0}</span>
            </div>
            <span className="separator">|</span>
            <div className="counter active">
              <span className="icon can-click">
                <i className="fa fa-heart" />
              </span>
              <span>{utils.addCommas(12)}</span>
            </div>
            <span className="separator">|</span>
            <div className="counter">
              <span className="icon">
                <i className="fa fa-share-alt" />
              </span>
              <span>share</span>
            </div>
            {false && <SharedButtons url={utils.sharedUrl(token)} title={title} asShow />}
          </div>
        </div>
      </div>
    )
  }
}
