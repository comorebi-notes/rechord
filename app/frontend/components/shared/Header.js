import React, { PureComponent } from "react"
import classNames               from "classnames"
import { Link  }                from "react-router-dom"

export default class Header extends PureComponent {
  constructor() {
    super()
    this.state = { isActiveBurger: false }
  }
  handleToggleBurger = () => this.setState({ isActiveBurger: !this.state.isActiveBurger })
  render() {
    const { isActiveBurger } = this.state
    const { currentUser: { id, name, icon_url } } = this.props
    const userPath = `/users/${id}`
    const burgerClass = classNames("navbar-burger", "burger", { "is-active": isActiveBurger })
    const navMenuClass = classNames("navbar-menu", { "is-active": isActiveBurger })

    return (
      <nav className="navbar is-primary" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item title-logo">
              <h1 className="title is-4">
                <span className="icon is-medium">
                  <i className="fa fa-paper-plane" />
                </span>
                <span>
                  rechord
                </span>
              </h1>
            </Link>
            <div className={burgerClass} onClick={this.handleToggleBurger} role="presentation">
              <span /><span /><span />
            </div>
          </div>

          <div className={navMenuClass}>
            <div className="navbar-start">
              <Link to="/about" className="navbar-item">
                About
              </Link>
              <Link to="/features" className="navbar-item">
                Features
              </Link>
            </div>
            <div className="navbar-end">
              {id ? (
                <Link to={userPath} className="navbar-item current-user">
                  <span>
                    @{name}
                  </span>
                  <img src={icon_url} width={32} height={32} alt={name} />
                </Link>
              ) : (
                <div className="navbar-item">
                  <div className="field">
                    <div className="control">
                      <Link to="auth/twitter" className="button is-primary is-inverted login-button">
                        <span className="icon">
                          <i className="fa fa-twitter" />
                        </span>
                        Login by Twitter
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
