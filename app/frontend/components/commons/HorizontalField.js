import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class HorizontalField extends PureComponent {
  render() {
    const { label, customClass, customStyle, children } = this.props
    const fieldClass = classNames("field", "is-horizontal", { [customClass]: customClass })
    return (
      <div className={fieldClass} style={{ customStyle }}>
        {label && (
          <div className="field-label is-normal">
            <label className="label">
              {label}
            </label>
          </div>
        )}
        <div className="field-body">
          <div className="field">
            <div className="control">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
