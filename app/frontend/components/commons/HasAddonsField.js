import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class HasAddonsField extends PureComponent {
  render() {
    const { customClass, customStyle, children } = this.props
    const fieldClass = classNames("field", "has-addons", { [customClass]: customClass })
    return (
      <div className={fieldClass} style={{ customStyle }}>
        {children}
      </div>
    )
  }
}
