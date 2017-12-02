import React, { Component } from "react"
import classNames           from "classnames"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"
import * as utils           from "../../../../utils"
import { FormData }         from "../../../../utils/browser-dependencies"

export default class Icon extends Component {
  constructor() {
    super()
    this.state = { loading: false }
  }
  handleFileChange = (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (files.length > 0) {
      const { user } = this.props
      const data = new FormData()
      data.append("name", user.name)
      data.append("icon", files[0])

      this.setState({ loading: true })
      api.updateUserIcon(
        { name: user.name, icon: data },
        () => {
          window.location.href = path.user.show(user.name)
        },
        (error) => {
          console.log(error.response.data)
          this.setState({ loading: false, error: utils.setApiErrors(error.response.data) })
        }
      )
    }
  }
  render() {
    const { loading } = this.state
    const { user: { icon, screen_name }, isOwn } = this.props
    return (
      <div className={classNames({ "loading-wrapper": loading })}>
        <figure className="image is-square">
          {icon ? (
            <img
              src={icon.url}
              className="user-icon has-border"
              alt={screen_name}
            />
          ) : (
            <div className="dummy-icon" />
          )}
        </figure>
        {isOwn && (
          <div className="file is-primary">
            <label className="file-label">
              <input className="file-input" type="file" onChange={this.handleFileChange} />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fa fa-upload" />
                </span>
                <span className="file-label">
                  upload icon
                </span>
              </span>
            </label>
          </div>
        )}
      </div>
    )
  }
}
