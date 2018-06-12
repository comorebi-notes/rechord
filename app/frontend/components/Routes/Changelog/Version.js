import React, { PureComponent } from "react"

export default class Version extends PureComponent {
  render() {
    const { version, updated_at, children } = this.props
    return (
      <div className="columns version">
        <div className="column is-one-third">
          <h2 className="title is-2">
            {version}
          </h2>
          <h3 className="subtitle is-3">
            {updated_at}
          </h3>
        </div>
        <div className="column">
          {children}
        </div>
      </div>
    )
  }
}
