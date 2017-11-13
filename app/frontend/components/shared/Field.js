import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class Field extends PureComponent {
  render() {
    const { customClass, customStyle, label, children } = this.props
    const fieldClass = classNames("field", { [customClass]: customClass })
    return (
      <div className={fieldClass} style={{ customStyle }}>
        {label && (
          <label className="label">
            {label}
          </label>
        )}
        <div className="control">
          {children}
        </div>
      </div>
    )
  }
}
