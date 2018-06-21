import React, { PureComponent } from "react"
import * as utils               from "../../../utils"

export default class DefaultNotification extends PureComponent {
  render() {
    const { data: { title, content, updated_at: updatedAt } } = this.props
    return (
      <div className="content notification">
        <time>{utils.humanDateTime(updatedAt, true)} </time>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }
}
