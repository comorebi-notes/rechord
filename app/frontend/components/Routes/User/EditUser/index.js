import React, { Component } from "react"
import DestroyUserModal     from "../DestroyUserModal"
import Field                from "../../../commons/Field"
import { validateTypes }    from "./validateTypes"
import { validator }        from "../../../../validator"
import FormWithValidate     from "../../../../validator/FormWithValidate"
import * as path            from "../../../../utils/path"
import * as api             from "../../../../api"
import * as utils           from "../../../../utils"

export default class EditUser extends Component {
  constructor(props) {
    super(props)
    const { user: { screen_name, profile, icon_url, site_url } } = props
    this.state = {
      screenName: screen_name || "",
      profile:    profile || "",
      iconUrl:    icon_url || "",
      siteUrl:    site_url || "",
      touch:      {},
      errors:     {},
      loading:    false
    }
  }
  handleChangeWithValidate = (target, value) => {
    const { touch } = this.state
    this.setState({ [target]: value })
    if (touch[target]) this.validate(target, value)
  }
  handleInputScreenName = (e) => this.handleChangeWithValidate("screenName", e.target.value)
  handleInputProfile    = (e) => this.handleChangeWithValidate("profile",    e.target.value)
  handleInputIconUrl    = (e) => this.handleChangeWithValidate("iconUrl",    e.target.value)
  handleInputSiteUrl    = (e) => this.handleChangeWithValidate("siteUrl",    e.target.value)
  handleUpdateUser = () => {
    this.setState({ loading: true })
    api.updateUser(
      { name: this.props.user.name, ...this.state },
      (success) => {
        const { name } = success.data
        this.props.history.push(path.user.show(name), { flash: ["success", "ユーザ情報が更新されました。"] })
      },
      (error) => (
        this.setState({ loading: false, error: utils.setApiErrors(error.response.data) })
      )
    )
  }
  handleToggleDestroyModal = () => this.setState({ destroyModal: !this.state.destroyModal })
  handleTouch = (target) => {
    const newTouchState = Object.assign({}, this.state.touch, { [target]: true })
    this.setState({ touch: newTouchState })
    this.validate(target, this.state[target])
  }
  validate = (target, value) => (
    validator({
      key:      target,
      types:    validateTypes[target],
      setState: (state) => this.setState(state),
      errors:   this.state.errors,
      value
    })
  )
  render() {
    const { screenName, profile, iconUrl, siteUrl, destroyModal, errors, loading } = this.state
    const { user, history, handleToggleEdit } = this.props
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    return (
      <div>
        <div className="card user-page edit">
          <div className="card-content">
            <div className="content">
              <div style={{ marginBottom: "2em" }}>
                <Field label="screen name">
                  <FormWithValidate errorKey="screenName" errors={errors}>
                    <input
                      type="input"
                      className="input"
                      value={screenName}
                      onBlur={() => this.handleTouch("screenName")}
                      onChange={this.handleInputScreenName}
                    />
                  </FormWithValidate>
                </Field>

                <Field label="profile">
                  <FormWithValidate errorKey="profile" errors={errors}>
                    <textarea
                      className="textarea"
                      value={profile}
                      onBlur={() => this.handleTouch("profile")}
                      onChange={this.handleInputProfile}
                    />
                  </FormWithValidate>
                </Field>

                <Field label="icon url">
                  <FormWithValidate errorKey="iconUrl" errors={errors}>
                    <input
                      type="input"
                      className="input"
                      value={iconUrl}
                      onBlur={() => this.handleTouch("iconUrl")}
                      onChange={this.handleInputIconUrl}
                    />
                  </FormWithValidate>
                </Field>

                <Field label="site url">
                  <FormWithValidate errorKey="siteUrl" errors={errors}>
                    <input
                      type="input"
                      className="input"
                      value={siteUrl}
                      onBlur={() => this.handleTouch("siteUrl")}
                      onChange={this.handleInputSiteUrl}
                    />
                  </FormWithValidate>
                </Field>
              </div>

              <p>
                <a
                  className="button is-primary"
                  role="presentation"
                  style={{ display: "block" }}
                  disabled={loading}
                  onClick={this.handleUpdateUser}
                >
                  <span className="icon">
                    <i className={iconClass} />
                  </span>
                  <span>update</span>
                </a>
              </p>
              <p>
                <a
                  className="button"
                  role="presentation"
                  style={{ display: "block" }}
                  disabled={loading}
                  onClick={handleToggleEdit}
                >
                  <span className="icon">
                    <i className="fa fa-undo" />
                  </span>
                  <span>cancel</span>
                </a>
              </p>
              <p style={{ marginTop: "2em" }}>
                <a
                  className="button is-danger"
                  role="presentation"
                  style={{ display: "block" }}
                  disabled={loading}
                  onClick={this.handleToggleDestroyModal}
                >
                  <span className="icon">
                    <i className="fa fa-ban" />
                  </span>
                  <span>delete</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <DestroyUserModal
          active={destroyModal}
          user={user}
          history={history}
          handleToggleDestroyModal={this.handleToggleDestroyModal}
        />
      </div>
    )
  }
}
