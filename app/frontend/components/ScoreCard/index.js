import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import LinkButton               from "../commons/LinkButton"
import { highlighter }          from "../../decorators/highlighter"
import * as path                from "../../utils/path"
import * as utils               from "../../utils"

export default class ScoreCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { highlightWords: props.highlightWords }
  }
  render() {
    const { score: { title, token, status, created_at, updated_at }, author, isOwn } = this.props
    const { highlightWords } = this.state
    const isClosed = status === "closed"
    const showScorePath = path.score.show(token)
    const editScorePath = path.score.edit(token)
    const scoreHighlighter = highlighter(highlightWords)
    return (
      <Link to={showScorePath} className="score-card">
        <div className={classNames("box", { closed: isClosed })}>
          <article className="media">
            <div className="media-content">
              <div className="content">
                <h3 className="score-title">
                  {scoreHighlighter(title)}
                  {isClosed && (
                    <span className="icon is-small">
                      <i className="fa fa-lock" />
                    </span>
                  )}
                </h3>
                <div className="score-attributes">
                  {author && (
                    <span className="author-name">
                      <figure className="image is-24x24">
                        <img src={utils.iconUrl(author.icon, "thumb")} className="user-icon" alt={author.name} />
                      </figure>
                      <strong>{author.screen_name}</strong>
                    </span>
                  )}
                  <time className="created-at">
                    作成日時 : <strong>{utils.humanDateTime(created_at, true)}</strong>
                  </time>
                  {created_at !== updated_at && (
                    <time className="updated-at">
                      更新日時 : <strong>{utils.humanDateTime(updated_at, true)}</strong>
                    </time>
                  )}
                </div>
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
