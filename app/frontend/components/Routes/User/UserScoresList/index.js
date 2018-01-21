import React, { Component } from "react"
import CardsList            from "../../../CardsList"

export default class UserScoresList extends Component {
  render() {
    return (
      <CardsList
        type="userScores"
        unit="scores"
        options={[]}
        {...this.props}
      />
    )
  }
}
