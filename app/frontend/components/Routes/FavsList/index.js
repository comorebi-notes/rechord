import React, { Component } from "react"
import CardsList            from "../../CardsList"

export default class FavsList extends Component {
  render() {
    return (
      <CardsList
        type="favs"
        label="いいねしたスコア"
        options={[]}
        {...this.props}
      />
    )
  }
}
