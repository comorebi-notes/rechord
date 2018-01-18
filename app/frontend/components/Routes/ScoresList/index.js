import React, { Component } from "react"
import CardsList            from "../CardsList"

export default class ScoresList extends Component {
  render() {
    return (
      <CardsList type="scores" {...this.props} />
    )
  }
}
