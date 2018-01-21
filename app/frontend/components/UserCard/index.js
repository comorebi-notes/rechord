import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import { highlighter }          from "../../decorators/highlighter"
import * as path                from "../../utils/path"
import * as utils               from "../../utils"

export default class UserCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { highlightWords: props.highlightWords }
  }
  render() {
    const { name, screen_name: screenName, profile, icon, scores_count: scoresCount } = this.props
    const { highlightWords } = this.state
    const showUserPath = path.user.show(name)
    const profileLines = profile ? profile.split("\n") : []
    const userHighlighter = highlighter(highlightWords)
    return (
      <Link to={showUserPath} className="user-card">
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-128x128">
                <img src={utils.iconUrl(icon)} className="user-icon" alt={screenName} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <h3 className="screen-name">
                  <p>{userHighlighter(screenName)}</p>
                  <p><small>({userHighlighter(name)})</small></p>
                </h3>
                <div className="user-attributes">
                  <div className="profile">
                    {profileLines.length > 3 ? (
                      <div>
                        {profileLines.slice(0, 3).map((line, index) => (
                          <p key={`${line}.${index}`}>{userHighlighter(line)}</p>
                        ))}
                        <p>...</p>
                      </div>
                    ) : (
                      profileLines.map((line, index) => (
                        <p key={`${line}.${index}`}>{userHighlighter(line)}</p>
                      ))
                    )}
                  </div>
                  <div className="scores-count">
                    <span className="icon">
                      <i className="fa fa-files-o" />
                    </span>
                    <span>{scoresCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Link>
    )
  }
}
