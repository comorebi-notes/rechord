import React, { Component } from "react"
import CardsList            from "../../CardsList"

export default class UsersList extends Component {
  render() {
    const options = [
      { key: "no_scores", label: "スコアが無いユーザを含める" }
    ]
    return (
      <CardsList
        type="users"
        label="ユーザ"
        options={options}
        {...this.props}
      />
    )
  }
}
