import React, { PureComponent } from "react"
import Version                  from "./Version"
import releases                 from "../../../constants/releases"

export default class Changelog extends PureComponent {
  render() {
    return (
      <div className="content changelog">
        <h1 className="title is-3">更新履歴</h1>
        {releases.reverse().map(release => (
          <Version version={release.version} updated_at={release.updated_at} key={release.version}>
            {release.content}
          </Version>
        ))}
      </div>
    )
  }
}
