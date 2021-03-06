import React, { Component } from "react"
import ScoreCard            from "../../ScoreCard"

export default class ScoresResult extends Component {
  render() {
    const { scores, word, noAuthor } = this.props
    return (
      <div className="scores result">
        {scores.length > 0 ? (
          scores.map(score => (
            <ScoreCard
              key={score.id}
              score={score}
              author={!noAuthor && score.user}
              highlightWords={word}
            />
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
