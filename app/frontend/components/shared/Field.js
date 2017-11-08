import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class Field extends PureComponent {
  render() {
    const { customClass, customStyle, children } = this.props
    const fieldClass = classNames("field", { [customClass]: customClass })
    return (
      <div className={fieldClass} style={{ customStyle }}>
        <div className="control">
          {children}
        </div>
      </div>
    )
  }
}
