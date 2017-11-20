import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class ShareIcon extends PureComponent {
  render() {
    const { icon, color, large, customClass } = this.props
    const wrapperClass = classNames("icon", `is-${large ? "large" : "medium"}`, { [customClass]: customClass })
    const stackClass = classNames("fa-stack", { "fa-lg": large })
    const iconClass = classNames("fa", "fa-stack-1x", "fa-inverse", { [`fa-${icon}`]: icon })
    const colorStyle = color ? { color } : {}
    return (
      <span className={wrapperClass}>
        <span className={stackClass}>
          <i className="fa fa-circle fa-stack-2x" style={colorStyle} />
          <i className={iconClass} />
        </span>
      </span>
    )
  }
}
