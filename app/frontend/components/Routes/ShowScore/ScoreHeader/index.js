import React, { Component } from "react"
import classNames           from "classnames"
import Author               from "./Author"
import ShareModal           from "../../../ShareModal"
import * as api             from "../../../../api"
import * as utils           from "../../../../utils"

export default class ScoreHeader extends Component {
  constructor() {
    super()
    this.state = {
      isActiveModal: false,
      favsCount:     0,
      myFavId:       false
    }
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
    if (!user.id) return false
    if (myFavId) {
      api.unfav(
        { favId: myFavId },
        () => this.setState({ favsCount: favsCount - 1, myFavId: false })
      )
    } else {
      api.fav(
        { userId: user.id, scoreId },
        ({ data: fav }) => this.setState({ favsCount: favsCount + 1, myFavId: fav.id })
      )
    }
    return true
  }
  handleToggleModal = () => this.setState({ isActiveModal: !this.state.isActiveModal })
  render() {
    const { author, title, token, status, user, viewsCount, createdAt, updatedAt } = this.props
    const { isActiveModal, favsCount, myFavId } = this.state
    const isClosed = status !== "published"
    return (
      <div>
        <div className="score-header">
          <h1 className="title">
            {title}
            {isClosed && (
              <span className="icon is-small">
                <i className="fa fa-lock" />
              </span>
            )}
          </h1>

          <Author author={author} createdAt={createdAt} updatedAt={updatedAt} />

          <div className="others">
            <div className="counter">
              <span className="icon">
                <i className="fa fa-eye" />
              </span>
              <span>{viewsCount ? utils.addCommas(viewsCount) : 0}</span>
            </div>

            <span className="separator">|</span>
            <div className={classNames("fav", { active: myFavId })}>
              <span
                className={classNames("icon", { "can-click": user.id })}
                onClick={this.toggleFav}
                role="presentation"
              >
                <i className={classNames("fa", { "fa-heart": myFavId, "fa-heart-o": !myFavId })} />
              </span>
              <span>{favsCount ? utils.addCommas(favsCount) : 0}</span>
            </div>

            <span className="separator">|</span>
            <button className="button has-text-link" onClick={this.handleToggleModal} disabled={isClosed}>
              <span className="icon has-text-link">
                <i className="fa fa-share-alt" />
              </span>
              <span>Share</span>
            </button>
          </div>
        </div>

        <ShareModal
          label="share!"
          token={token}
          title={title}
          isActive={isActiveModal}
          handleSetState={(newState) => this.setState(newState)}
        />
      </div>
    )
  }
}
