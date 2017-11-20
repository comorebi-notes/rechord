import React, { PureComponent } from "react"

export default class AuthorCard extends PureComponent {
  render() {
    const { author: { id, name, icon_url } } = this.props
    const userPath = `/users/${id}`
    return (
      <a href={userPath} className="box" style={{ alignSelf: "start" }}>
        <article className="media" style={{ alignItems: "center" }}>
          <div className="media-left">
            <figure className="image is-32x32">
              <img src={icon_url} alt={name} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <strong>@{name}</strong>
            </div>
          </div>
        </article>
      </a>
    )
  }
}
