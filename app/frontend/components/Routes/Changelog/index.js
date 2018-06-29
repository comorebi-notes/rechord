import React, { PureComponent } from "react"
import Version                  from "./Version"
import releases                 from "../../../constants/releases"
import * as utils               from "../../../utils"

export default class Changelog extends PureComponent {
  componentDidMount = () => utils.setMeta("更新履歴", "", this.props.history)
  render() {
    return (
      <div className="content changelog">
        <h1 className="title is-3">更新履歴</h1>
        {releases.slice().reverse().map(release => (
          <Version version={release.version} updated_at={release.updated_at} key={release.version}>
            {release.content}
          </Version>
        ))}
      </div>
    )
  }
}
