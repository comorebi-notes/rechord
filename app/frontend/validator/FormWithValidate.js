import React, { PureComponent } from "react"
import classNames               from "classnames"
import { translate }            from "./translate"

export default class FormWithValidate extends PureComponent {
  render() {
    const { errorKey, errors, children } = this.props
    const targetErrors = errors && errors[errorKey]
    const { className } = children.props
    const fieldClass = classNames(className, {
      "is-danger": targetErrors && targetErrors.length > 0
    })
    return (
      <div>
        {React.cloneElement(children, { className: fieldClass })}
        {targetErrors && targetErrors.map(error => (
          <p className="help is-danger" key={error}>
            {translate(errorKey, error)}
          </p>
        ))}
      </div>
    )
  }
}
