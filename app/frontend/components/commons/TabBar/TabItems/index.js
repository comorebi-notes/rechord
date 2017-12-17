import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import * as path                from "../../../../utils/path"

export default class TabItems extends PureComponent {
  render () {
    const { currentUser, currentPath } = this.props
    const isActive = (targetPath) => targetPath === currentPath
    const tabItemComponent = ({ label, icon, targetPath, disabled }) => (
      <li
        className={classNames({ "is-active": isActive(targetPath) })}
        key={label}
      >
        {disabled ? (
          <span className="disabled">
            <span className="icon">
              <i className={classNames("fa", `fa-${icon}`)} />
            </span>
            <span className="tab-label">
              {label}
            </span>
          </span>
        ) : (
          <Link to={targetPath}>
            <span className="icon">
              <i className={classNames("fa", `fa-${icon}`)} />
            </span>
            <span className="tab-label">
              {label}
            </span>
          </Link>
        )}
      </li>
    )
    const tabItems = [
      { label: "new score", icon: "file-text", targetPath: path.root },
      { label: "my page",   icon: "user",      targetPath: path.user.show(currentUser.name) },
      { label: "bookmark",  icon: "bookmark",  targetPath: "", disabled: true },
      { label: "ranking",   icon: "trophy",    targetPath: "", disabled: true }
    ]
    return tabItems.map(item => tabItemComponent(item))
  }
}
