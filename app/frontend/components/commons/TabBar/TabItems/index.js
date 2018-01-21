import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"
import LoginModal               from "../../LoginModal"
import * as path                from "../../../../utils/path"

export default class TabItems extends PureComponent {
  constructor() {
    super()
    this.state = { modal: false }
  }
  handleToggleModal = () => this.setState({ modal: !this.state.modal })
  render () {
    const { currentUser, currentPath } = this.props
    const { modal } = this.state
    const isActive = (targetPath) => {
      if (targetPath === currentPath) return true
      switch (true) {
        case (/^\/(scores|[a-zA-Z0-9-_]{11}).*/).test(currentPath): return targetPath === path.score.index()
        case (/^\/users.*/).test(currentPath):
          return currentPath !== path.user.show(currentUser.name) && targetPath === path.user.index()
        default: return false
      }
    }
    const tabItemComponent = ({ label, icon, targetPath, onClick }) => (
      <li
        className={classNames({ "is-active": isActive(targetPath) })}
        key={label}
      >
        {onClick ? (
          <a role="presentation" onClick={onClick}>
            <span className="icon">
              <i className={classNames("fa", `fa-${icon}`)} />
            </span>
            <span className="tab-label">
              {label}
            </span>
          </a>
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
      { label: "new score", icon: "file-o",  targetPath: path.root },
      { label: "scores",    icon: "files-o", targetPath: path.score.index() },
      { label: "users",     icon: "users",   targetPath: path.user.index() },
      {
        label:      "my page",
        icon:       "user-circle-o",
        targetPath: path.user.show(currentUser.name),
        onClick:    !currentUser.name && this.handleToggleModal
      },
      {
        label:      "my favs",
        icon:       "heart",
        targetPath: path.fav.index(),
        onClick:    !currentUser.name && this.handleToggleModal
      }
    ]
    return (
      <div>
        <ul>
          {tabItems.map(item => tabItemComponent(item))}
        </ul>
        {!currentUser.name && <LoginModal active={modal} hideModal={this.handleToggleModal} />}
      </div>
    )
  }
}
