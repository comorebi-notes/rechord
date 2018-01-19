import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import { highlighter }          from "../../decorators/highlighter"
import * as path                from "../../utils/path"
import * as utils               from "../../utils"

export default class ScoreCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { highlightWords: props.highlightWords }
  }
  render() {
    const {
      score: { title, token, status, views_count: viewsCount, favs_count: favsCount, created_at: createdAt }, author
    } = this.props
    const { highlightWords } = this.state
    const isClosed = status === "closed"
    const showScorePath = path.score.show(token)
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
                  <nav className="field is-grouped">
                    <div className="control">
                      <span className="icon">
                        <i className="fa fa-eye" />
                      </span>
                      <span>{viewsCount ? utils.addCommas(viewsCount) : 0}</span>
                    </div>
                    <div className="control">
                      <span className="icon">
                        <i className="fa fa-heart-o" />
                      </span>
                      <span>{favsCount ? utils.addCommas(favsCount) : 0}</span>
                    </div>
                    <div className="control">
                      <time>
                        {utils.humanDateTime(createdAt, true)} 投稿
                      </time>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Link>
    )
  }
}
