import React, { PureComponent } from "react"

export default class AuthorCard extends PureComponent {
  render() {
    const { author: { name, icon_url } } = this.props
    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={icon_url} alt={name} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p style={{ lineHeight: 1.25 }}>
                <span className="is-size-7">author</span><br />
                <strong>@{name}</strong>
              </p>
            </div>
            {false && (
              <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item">
                    <span className="icon is-small"><i className="fa fa-reply"></i></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small"><i className="fa fa-retweet"></i></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small"><i className="fa fa-heart"></i></span>
                  </a>
                </div>
              </nav>
            )}
          </div>
        </article>
      </div>
    )
  }
}
