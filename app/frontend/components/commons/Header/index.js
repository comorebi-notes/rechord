import React, { PureComponent } from "react"
import classNames               from "classnames"
import { Link  }                from "react-router-dom"
import LoginModal               from "../LoginModal"
import Notification             from "../Notification"
import NotificationIcon         from "../Notification/NotificationIcon"
import * as api                 from "../../../api"
import * as path                from "../../../utils/path"
import * as utils               from "../../../utils"

export default class Header extends PureComponent {
  constructor(props) {
    super(props)
    const { notifications } = props
    this.state = {
      burger: false,
      isActiveLoginModal: false,
      isActiveNotification: false,
      notifications
    }
  }
  componentWillReceiveProps({ pathname, notifications, loading }) {
    if (pathname !== this.props.pathname) this.setState({ burger: false })
    if (!loading && notifications !== this.state.notifications) this.setState({ notifications })
  }
  handleToggleBurger       = () => this.setState(prevState => ({ burger: !prevState.burger }))
  handleToggleLoginModal   = () => this.setState(prevState => ({ isActiveLoginModal: !prevState.isActiveLoginModal }))
  handleToggleNotification = () => this.setState(prevState => ({ isActiveNotification: !prevState.isActiveNotification }))
  handleClearNotification  = () => {
    const { currentUser: { name }, history } = this.props
    api.read(
      { name },
      () => this.setState({ isActiveNotification: false, notifications: [] }),
      () => history.push(path.root, { flash: ["error", "既読処理に失敗しました。"] })
    )
    this.setState({ isActiveNotification: false, notifications: [] })
  }

  render() {
    const { burger, isActiveLoginModal, isActiveNotification, notifications } = this.state
    const { currentUser: { name, icon }, pathname } = this.props
    const userPath = path.user.show(name)
    const burgerClass = classNames("navbar-burger", "burger", { "is-active": burger })
    const navMenuClass = classNames("navbar-menu", { "is-active": burger })
    const navbarItemClass = (targetPath) => classNames("navbar-item", { "is-active": pathname === targetPath })
    const notificationIcon = (customClass) => name && (
      <NotificationIcon
        isActiveNotification
        customClass={customClass}
        notifications={notifications}
        handleToggleNotification={this.handleToggleNotification}
      />
    )
    return (
      <div>
        <nav className="navbar is-primary" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item title-logo">
                <h1 className="title is-4">
                  <img src="/images/logo_white.png" alt="rechord" />
                  <span>rechord</span>
                </h1>
              </Link>
              {notificationIcon("is-only-mobile")}
              <div className={burgerClass} onClick={this.handleToggleBurger}>
                <span /><span /><span />
              </div>
            </div>

            <div className={navMenuClass}>
              <div className="navbar-start">
                <Link to={path.about} className={navbarItemClass(path.about)}>
                  About
                </Link>
                <span className="navbar-item">
                  <span style={{ opacity: 0.5 }}>FAQ</span>
                </span>
                <Link to={path.changelog} className={navbarItemClass(path.changelog)}>
                  Changelog
                </Link>
              </div>

              <div className="navbar-end">
                {notificationIcon("is-hidden-mobile")}
                {name ? (
                  <Link to={userPath} className={`${navbarItemClass(userPath)} current-user`}>
                    <span>
                      @{name}
                    </span>
                    <img src={utils.iconUrl(icon, "thumb")} className="user-icon" width={32} height={32} alt={name} />
                  </Link>
                ) : (
                  <div className="navbar-item">
                    <div className="field">
                      <div className="control">
                        <button
                          type="button"
                          className="button is-primary is-inverted login-button"
                          onClick={this.handleToggleLoginModal}
                        >
                          <span className="icon">
                            <i className="fa fa-sign-in" />
                          </span>
                          <span>Login / Register</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {!name && <LoginModal active={isActiveLoginModal} hideModal={this.handleToggleLoginModal} />}
        <Notification
          notifications={notifications}
          isActive={isActiveNotification}
          handleToggleNotification={this.handleToggleNotification}
          handleClearNotification={this.handleClearNotification}
        />
      </div>
    )
  }
}
