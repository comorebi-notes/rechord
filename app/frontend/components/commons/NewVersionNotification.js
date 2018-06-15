import React, { Component }   from "react"
import * as localStorageState from "../../utils/localStorageState"

export default class NewVersionNotification extends Component {
  constructor(props) {
    super(props)
    const localVersion = localStorageState.getCurrentVersion()
    localStorageState.setCurrentVersion(props.currentVersion)
    this.state = { localVersion }
  }
  render() {
    const { localVersion } = this.state
    return (
      <div />
    )
  }
}
