import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class TabBar extends PureComponent {
  render() {
    return (
      <div className="tabs">
        <div className="container">
          <ul>
            <li className="is-active"><a>new score</a></li>
            <li><a>my page</a></li>
            <li><a>ranking</a></li>
            <li><a>features</a></li>
          </ul>
        </div>
      </div>
    )
  }
}
