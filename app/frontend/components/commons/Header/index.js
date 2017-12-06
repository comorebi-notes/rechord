import React, { PureComponent } from "react"
import classNames               from "classnames"
import { Link  }                from "react-router-dom"
import LoginModal               from "./LoginModal"
import * as path                from "../../../utils/path"
import * as utils               from "../../../utils"

export default class Header extends PureComponent {
  constructor() {
    super()
    this.state = { burger: false, modal: false }
  }
  componentWillReceiveProps({ pathname }) {
    if (pathname !== this.props.pathname) {
      this.setState({ burger: false })
    }
  }
  handleToggleBurger = () => this.setState({ burger: !this.state.burger })
  handleToggleModal  = () => this.setState({ modal:  !this.state.modal })
  render() {
    const { burger, modal } = this.state
    const { currentUser: { name, icon } } = this.props
    const userPath = path.user.show(name)
    const burgerClass = classNames("navbar-burger", "burger", { "is-active": burger })
    const navMenuClass = classNames("navbar-menu", { "is-active": burger })

    return (
      <nav className="navbar is-primary" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item title-logo">
              <h1 className="title is-4">
                <img src="/assets/images/logo_white.png" alt="rechord" />
                <span>rechord</span>
              </h1>
            </Link>
            <div className={burgerClass} onClick={this.handleToggleBurger} role="presentation">
              <span /><span /><span />
            </div>
          </div>

          <div className={navMenuClass}>
            <div className="navbar-start">
              <Link to={path.about} className="navbar-item">
                about
              </Link>
              {false && (
                <Link to="/features" className="navbar-item">
                  features
                </Link>
              )}
              <span className="navbar-item">
                <span style={{ opacity: 0.7 }}>features</span>
                <span className="tag is-rounded" style={{ marginLeft: ".6em" }}>
                  coming soon !
                </span>
              </span>
            </div>
            <div className="navbar-end">
              {name ? (
                <Link to={userPath} className="navbar-item current-user">
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
                        className="button is-primary is-inverted login-button"
                        onClick={this.handleToggleModal}
                      >
                        <span className="icon">
                          <i className="fa fa-sign-in" />
                        </span>
                        <span>login or register</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!name && <LoginModal active={modal} hideModal={this.handleToggleModal} />}
          </div>
        </div>
      </nav>
    )
  }
}
