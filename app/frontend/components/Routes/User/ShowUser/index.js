import React, { PureComponent } from "react"
import * as path                from "../../../../utils/path"

export default class ShowUser extends PureComponent {
  render() {
    const { user: { screen_name, profile, site, twitter }, isOwn, handleToggleEdit } = this.props
    return (
      <div className="card-content">
        <h2 className="title is-4">
          {screen_name}
        </h2>
        <div className="content">
          {site && (
            <p className="url">
              <a href={site} target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <i className="fa fa-home fa-lg" />
                </span>
                {site}
              </a>
            </p>
          )}
          {twitter && (
            <p className="url">
              <a href={path.twitter(twitter)} target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <i className="fa fa-twitter fa-lg" />
                </span>
                {twitter}
              </a>
            </p>
          )}
          <div className="profile">
            {profile && profile.split("\n").map((line, index) => (
              <p key={`${line}.${index}`}>{line}</p>
            ))}
          </div>
          {isOwn && (
            <div>
              <p>
                <button type="button" className="button is-primary wide-button" onClick={handleToggleEdit}>
                  <span className="icon">
                    <i className="fa fa-pencil-square-o" />
                  </span>
                  <span>Edit Profile</span>
                </button>
              </p>
              <p>
                <a href={path.logout} className="button" style={{ display: "block" }}>
                  <span className="icon">
                    <i className="fa fa-sign-out" />
                  </span>
                  <span>Logout</span>
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
