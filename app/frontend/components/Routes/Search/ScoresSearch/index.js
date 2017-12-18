import React, { Component } from "react"
import ScoreCard            from "../../../ScoreCard"

export default class ScoresSearch extends Component {
  render() {
    const { scores } = this.props
    return (
      <div className="scores">
        {scores.length > 0 ? (
          scores.map(score => (
            <ScoreCard key={score.id} score={score} author={score.user} />
          ))
        ) : (
          <div className="box no-score">
            <div className="media-content">
              <div className="content">
                No scores.
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
