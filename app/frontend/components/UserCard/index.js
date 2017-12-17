import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import * as path                from "../../utils/path"

export default class UserCard extends PureComponent {
  render() {
    const { name, screen_name: screenName, profile, icon, scores_count: scoresCount } = this.props
    const showUserPath = path.user.show(name)
    const profileLines = profile ? profile.split("\n") : []
    return (
      <Link to={showUserPath} className="user-card">
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-128x128">
                <img src={icon.url} className="user-icon" alt={screenName} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <h3 className="screen-name">
                  {screenName} <small>({name})</small>
                </h3>
                <div className="user-attributes">
                  <p>
                    scores: <strong>{scoresCount}</strong>
                  </p>
                  <div className="profile">
                    {profileLines.length > 3 ? (
                      <div>
                        {profileLines.slice(0, 3).map((line, index) => (
                          <p key={`${line}.${index}`}>{line}</p>
                        ))}
                        <p>...</p>
                      </div>
                    ) : (
                      profileLines.map((line, index) => (
                        <p key={`${line}.${index}`}>{line}</p>
                      ))
                    )}
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
