import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class Button extends PureComponent {
  render() {
    const { color, icon, text, onClick } = this.props
    return (
      <button
        onClick={onClick}
        className={classNames("button", { [`is-${color}`]: color })}
      >
        {icon && (
          <span className="icon is-small">
            <i className={classNames("fa", { [`fa-${icon}`]: icon })} />
          </span>
        )}
        <span>{text}</span>
      </button>
    )
  }
}
