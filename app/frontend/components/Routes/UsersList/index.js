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
        unit="users"
        label="ユーザ"
        customClass="multi-columns"
        options={options}
        {...this.props}
      />
    )
  }
}
