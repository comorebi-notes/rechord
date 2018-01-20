import React, { Component } from "react"
import CardsList            from "../CardsList"

export default class UsersList extends Component {
  render() {
    const options = [
      { key: "noscore", label: "スコア数0のユーザを含める" }
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
