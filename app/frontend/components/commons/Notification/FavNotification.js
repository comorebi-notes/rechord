import React, { Component } from "react"
import { Link }             from "react-router-dom"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"
import * as utils           from "../../../utils"

export default class FavNotification extends Component {
  constructor() {
    super()
    this.state = { score: null, loading: true }
  }
  componentDidMount() {
    const deletedScore = { title: "削除済のスコア" }
    api.showScore(
      { token: this.props.data.title },
      ({ data: { score } }) => {
        this.setState({ score: score.status === "deleted" ? deletedScore : score, loading: false })
      },
      () => this.setState({ score: deletedScore, loading: false })
    )
  }
  render() {
    const { score, loading } = this.state
    const { data: { updated_at: updatedAt }, handleToggleNotification } = this.props
    const isActive = loading || (score && score.favs_count > 0)
    return isActive && (
      <div className="content notification fav">
        <time>{utils.humanDateTime(updatedAt, true)} </time>
        {loading ? (
          <div className="loading-wrapper" />
        ) : (
          <p>
            <span className="icon has-text-danger">
              <i className="fa fa-heart" />
            </span>
            <strong>
              {score.token ? (
                <Link to={path.score.show(score.token)} onClick={handleToggleNotification}>{score.title}</Link>
              ) : (
                <span>{score.title}</span>
              )}
            </strong>
            <span>が通算</span>
            <strong>{score.favs_count}回</strong>
            <span>いいねをされました。</span>
          </p>
        )}
      </div>
    )
  }
}
