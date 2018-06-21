import React, { Component } from "react"
import { Link }             from "react-router-dom"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"
import * as utils           from "../../../utils"

export default class FavNotification extends Component {
  constructor() {
    super()
    this.state = { score: null }
  }
  componentDidMount() {
    const deletedScore = { title: "削除済のスコア" }
    api.showScore(
      { token: this.props.data.params.score },
      ({ data: { score } }) => {
        this.setState({ score: score.status === "deleted" ? deletedScore : score })
      },
      () => this.setState({ score: deletedScore })
    )
  }
  render() {
    const { score } = this.state
    const { data: { params: { count }, updated_at: updatedAt }, handleToggleNotification } = this.props
    return (
      <div className="content notification fav">
        <time>{utils.humanDateTime(updatedAt, true)} </time>
        {score ? (
          <p>
            <strong>
              {score.token ? (
                <Link to={path.score.show(score.token)} onClick={handleToggleNotification}>{score.title}</Link>
              ) : (
                <span>{score.title}</span>
              )}
            </strong>
            <span>が合計</span>
            <strong>{count}回</strong>
            <span>いいねをされました。</span>
          </p>
        ) : (
          <div className="loading-wrapper" />
        )}
      </div>
    )
  }
}
