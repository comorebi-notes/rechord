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
  handleToggleModal = () => this.setState({ modal:  !this.state.modal })
  render () {
    const { currentUser, currentPath } = this.props
    const { modal } = this.state
    const isActive = (targetPath) => targetPath === currentPath
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
    const showUserPath = path.user.show(currentUser.name)
    const tabItems = [
      { label: "new score", icon: "file-text", targetPath: path.root },
      {
        label:      "my page",
        icon:       "user",
        targetPath: showUserPath,
        onClick:    !currentUser.name && this.handleToggleModal
      },
      // { label: "bookmark",  icon: "bookmark",  targetPath: "" },
      // { label: "ranking",   icon: "trophy",    targetPath: "" }
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
