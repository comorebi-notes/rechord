import React, { Component } from "react"
import CardsList            from "../../CardsList"

export default class FavsList extends Component {
  render() {
    return (
      <CardsList
        type="favs"
        unit="scores"
        label="いいねしたスコア"
        customClass="multi-columns"
        options={[]}
        {...this.props}
      />
    )
  }
}
