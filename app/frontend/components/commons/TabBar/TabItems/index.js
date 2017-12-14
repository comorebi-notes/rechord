import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import * as path                from "../../../../utils/path"

export default class TabItems extends PureComponent {
  render () {
    const { currentUser, currentPath } = this.props
    const isActive = (targetPath) => targetPath === currentPath
    const tabItemComponent = ({ label, targetPath, disabled }) => (
      <li
        className={classNames({ "is-active": isActive(targetPath) })}
        key={label}
      >
        {disabled ? (
          <span className="disabled">{label}</span>
        ) : (
          <Link to={targetPath}>{label}</Link>
        )}
      </li>
    )
    const tabItems = [
      { label: "new score", targetPath: path.root },
      { label: "my page",   targetPath: path.user.show(currentUser.name) },
      { label: "bookmark",  targetPath: "", disabled: true },
      { label: "ranking",   targetPath: "", disabled: true }
    ]
    return tabItems.map(item => tabItemComponent(item))
  }
}
