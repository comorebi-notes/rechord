import React, { PureComponent } from "react"
import { Link }                 from "react-router-dom"
import classNames               from "classnames"

export default class LinkButton extends PureComponent {
  render() {
    const { to, color, size, icon, text, disabled, customClass, customStyle } = this.props
    const buttonClass = classNames("button", customClass, { [`is-${color}`]: color, [`is-${size}`]: size })
    const iconClass = classNames("fa", { [`fa-${icon}`]: icon })
    return (
      <Link
        role="presentation"
        to={to}
        className={buttonClass}
        style={customStyle}
        disabled={disabled}
      >
        {icon && (
          <span className="icon is-small">
            <i className={iconClass} />
          </span>
        )}
        {text && (
          <span>{text}</span>
        )}
      </Link>
    )
  }
}
