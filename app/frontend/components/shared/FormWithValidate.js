import React, { PureComponent } from "react"
import classNames               from "classnames"

export default class FormWithValidate extends PureComponent {
  render() {
    const { errors, touch, children } = this.props
    const { className } = children.props
    const fieldClass = classNames(className, {
      "is-danger": touch && errors && errors.length > 0
    })
    return (
      <div>
        {React.cloneElement(children, { className: fieldClass })}
        {touch && errors && errors.map(error => (
          <p className="help is-danger" key={error}>
            {error}
          </p>
        ))}
      </div>
    )
  }
}
