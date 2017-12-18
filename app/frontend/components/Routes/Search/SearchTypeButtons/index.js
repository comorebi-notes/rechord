import React, { Component } from "react"
import classNames           from "classnames"

export default class SearchTypeButtons extends Component {
  render() {
    const { type, handleChangeType } = this.props
    const buttonClass = (target) => classNames("button", {
      "is-info":      type === target,
      "is-selected:": type === target
    })
    const searchTypeButton = ({ searchType, icon }) => (
      <button
        className={buttonClass(searchType)}
        onClick={() => handleChangeType(searchType)}
        key={searchType}
      >
        <span className="icon">
          <i className={classNames("fa", `fa-${icon}`)} />
        </span>
        <span className="is-hidden-mobile">{searchType}</span>
      </button>
    )
    const searchTypes = [
      { searchType: "scores", icon: "file-text" },
      { searchType: "users",  icon: "user" }
    ]
    return (
      <div className="buttons has-addons">
        {searchTypes.map(searchTypeButton)}
      </div>
    )
  }
}
