import React, { Component } from "react"
import CardsList            from "../../CardsList"

export default class ScoresList extends Component {
  render() {
    const options = [
      { key: "guest", label: "ゲストの投稿を含める" }
    ]
    return (
      <CardsList
        type="scores"
        unit="scores"
        label="スコア"
        customClass="multi-columns"
        options={options}
        {...this.props}
      />
    )
  }
}
