import React, { Component } from "react"
import classNames           from "classnames"
import FormWithValidate     from "../../../../validator/FormWithValidate"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"
import * as utils           from "../../../../utils"
import { window, FormData } from "../../../../utils/browser-dependencies"

export default class Icon extends Component {
  constructor() {
    super()
    this.state = { loading: false, errors: {} }
  }
  handleChangeIcon = (e) => {
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
          if (error.response.status === 500) {
            window.location.href = path.user.show(user.name)
          } else {
            this.setState({ loading: false, errors: utils.setApiErrors(error.response.data) })
          }
        }
      )
    }
  }
  handleRemoveIcon = () => {
    const { user } = this.props
    this.setState({ loading: true })
    api.removeUserIcon(
      { name: user.name },
      () => {
        window.location.href = path.user.show(user.name)
      },
      (error) => {
        if (error.response.status === 500) {
          window.location.href = path.user.show(user.name)
        } else {
          this.setState({ loading: false, errors: utils.setApiErrors(error.response.data) })
        }
      }
    )
  }
  render() {
    const { loading, errors } = this.state
    const { user: { icon, screen_name }, isOwn } = this.props
    return (
      <div className={classNames({ "loading-wrapper": loading })}>
        <figure className="image is-square">
          <img
            src={utils.iconUrl(icon)}
            className="user-icon has-border"
            alt={screen_name}
          />
        </figure>
        {isOwn && (
          <FormWithValidate errorKey="icon" target="user" errors={errors} customStyle={{ width: "100%" }}>
            <div className="icon-buttons">
              <div className="file is-primary is-small">
                <label className="file-label">
                  <input className="file-input" type="file" onChange={this.handleChangeIcon} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fa fa-upload" />
                    </span>
                    <span className="file-label">
                      Upload Icon
                    </span>
                  </span>
                </label>
              </div>
              <button
                className="button is-danger is-small"
                onClick={this.handleRemoveIcon}
                disabled={!icon || !icon.url}
              >
                <span className="icon">
                  <i className="fa fa-trash fa-lg" />
                </span>
                <span>Remove Icon</span>
              </button>
            </div>
          </FormWithValidate>
        )}
      </div>
    )
  }
}
