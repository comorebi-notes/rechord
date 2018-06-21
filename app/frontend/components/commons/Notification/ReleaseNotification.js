import React, { PureComponent } from "react"
import releases                 from "../../../constants/releases"
import * as utils               from "../../../utils"

export default class ReleaseNotification extends PureComponent {
  render() {
    const { data: { title, updated_at: updatedAt } } = this.props
    const version = releases.find(release => release.version === title)
    return (
      <div className="content notification release">
        <time>{utils.humanDateTime(updatedAt, true)} </time>
        <h3>{title} <small>がリリースされました</small></h3>
        {version.content}
      </div>
    )
  }
}
