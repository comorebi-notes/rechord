import React, { PureComponent } from "react"

export default class ControlField extends PureComponent {
  render() {
    const { label, customClass, customStyle, children } = this.props
    return (
      <div className={`field ${customClass}`} style={{ customStyle }}>
        <label className="label">
          {label}
        </label>
        <div className="control">
          {children}
        </div>
      </div>
    )
  }
}
