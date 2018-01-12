import React, { Component } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import SharedButtons            from "../../../SharedButtons"
import * as api                 from "../../../../api"
import * as path                from "../../../../utils/path"
import * as utils               from "../../../../utils"

export default class ScoreHeader extends Component {
  constructor() {
    super()
    this.state = { favsCount: 0, myFavId: false }
  }
  componentWillReceiveProps = ({ favs }) => {
    if (favs && !this.props.favs) {
      const { user } = this.props
      const favsCount = favs && favs.length
      const fav = user && favs && favs.find(f => f.user_id === user.id)
      this.setState({ favsCount, myFavId: fav && fav.id })
    }
  }
  toggleFav = () => {
    const { scoreId, user } = this.props
    const { favsCount, myFavId } = this.state
    if (myFavId) {
      api.unfav(
        { favId: myFavId },
        () => this.setState({ favsCount: favsCount - 1, myFavId: false })
      )
    } else {
      api.fav(
        { userId: user.id, scoreId },
        (success) => {
          const { data: fav } = success
          this.setState({ favsCount: favsCount + 1, myFavId: fav.id })
        }
      )
    }
  }
  render() {
    const { author, title, token, status, viewsCount, createdAt, updatedAt } = this.props
    const { favsCount, myFavId } = this.state
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
            <div className={classNames("counter", { active: myFavId })}>
              <span className="icon can-click" onClick={this.toggleFav} role="presentation">
                <i className={classNames("fa", { "fa-heart": myFavId, "fa-heart-o": !myFavId })} />
              </span>
              <span>{favsCount ? utils.addCommas(favsCount) : 0}</span>
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
