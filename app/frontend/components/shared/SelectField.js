import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class SelectField extends PureComponent {
  render() {
    const { icon, customClass, customStyle, children } = this.props
    const fieldClass = classNames("field", { [customClass]: customClass })
    const iconClass = classNames("fa", { [`fa-${icon}`]: icon })
    return (
      <div className={fieldClass} style={{ customStyle }}>
        <div className="control has-icons-left">
          <div className="select">
            {children}
          </div>
          {icon && (
            <div className="icon is-small is-left">
              <i className={iconClass} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
