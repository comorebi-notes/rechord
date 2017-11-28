import React, { Component } from "react"
import Field                from "../../../commons/Field"
import * as api             from "../../../../api"

export default class EditUser extends Component {
  constructor(props) {
    super(props)
    const { user: { screen_name, profile, icon_url, site_url } } = props
    this.state = { screenName: screen_name, profile, iconUrl: icon_url, siteUrl: site_url }
  }
  handleInputScreenName = (e) => this.setState({ screenName: e.target.value })
  handleInputProfile    = (e) => this.setState({ profile: e.target.value })
  handleInputIconUrl    = (e) => this.setState({ iconUrl: e.target.value })
  handleInputSiteUrl    = (e) => this.setState({ siteUrl: e.target.value })
  handleUpdateUser = () => {
    api.updateUser(
      { name: this.props.user.name, ...this.state },
      (success) => {
        const { name } = success.data
        this.props.history.push(`/users/${name}`, { flash: ["success", "ユーザ情報が更新されました。"] })
      },
      () => this.props.history.push("/", { flash: ["error", "読み込みに失敗しました。"] })
    )
  }
  render() {
    const { screenName, profile, iconUrl, siteUrl } = this.state
    const { handleToggleEdit } = this.props
    return (
      <div>
        <div className="card" style={{ boxShadow: "none" }}>
          <div className="card-content">
            <div className="content">
              <div style={{ marginBottom: "2em" }}>
                <Field label="screen name">
                  <input
                    type="input"
                    className="input"
                    value={screenName || ""}
                    onChange={this.handleInputScreenName}
                  />
                </Field>
                <Field label="profile">
                  <textarea
                    className="textarea"
                    value={profile || ""}
                    onChange={this.handleInputProfile}
                  />
                </Field>
                <Field label="icon url">
                  <input
                    type="input"
                    className="input"
                    value={iconUrl || ""}
                    onChange={this.handleInputIconUrl}
                  />
                </Field>
                <Field label="site url">
                  <input
                    type="input"
                    className="input"
                    value={siteUrl || ""}
                    onChange={this.handleInputSiteUrl}
                  />
                </Field>
              </div>

              <p>
                <a
                  className="button is-primary"
                  role="presentation"
                  style={{ display: "block" }}
                  onClick={this.handleUpdateUser}
                >
                  <span className="icon">
                    <i className="fa fa-save" />
                  </span>
                  <span>update</span>
                </a>
              </p>
              <p>
                <a
                  className="button"
                  role="presentation"
                  style={{ display: "block" }}
                  onClick={handleToggleEdit}
                >
                  <span className="icon">
                    <i className="fa fa-undo" />
                  </span>
                  <span>cancel</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
