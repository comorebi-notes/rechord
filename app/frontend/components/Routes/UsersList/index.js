import React, { Component } from "react"
import CardsList            from "../CardsList"

export default class UsersList extends Component {
  render() {
    return (
      <CardsList type="users" {...this.props} />
    )
  }
}
