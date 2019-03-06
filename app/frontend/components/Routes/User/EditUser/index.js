import React, { Component } from "react"
import classNames           from "classnames"
import DestroyUserModal     from "../DestroyUserModal"
import Field                from "../../../commons/Field"
import { validateTypes }    from "./validateTypes"
import { validator }        from "../../../../validator"
import FormWithValidate     from "../../../../validator/FormWithValidate"
import * as path            from "../../../../utils/path"
import * as api             from "../../../../api"
import * as utils           from "../../../../utils"
import { window }           from "../../../../utils/browser-dependencies"

export default class EditUser extends Component {
  constructor(props) {
    super(props)
    const { user: { name, screen_name, profile, site, twitter } } = props
    this.state = {
      name:       name || "",
      screenName: screen_name || "",
      profile:    profile || "",
      site:       site || "",
      twitter:    twitter || "",
      touch:      {},
      errors:     {},
      loading:    false,
      validName:  true
    }
  }
  handleChangeWithValidate = (target, value) => {
    const { touch } = this.state
    this.setState({ [target]: value })
    if (touch[target]) this.validate(target, value)
  }
  handleInputName = (e) => {
    this.handleChangeWithValidate("name", e.target.value)
    if (e.target.value === this.props.user.name) return this.setState({ validName: true })
    if (!e.target.value) return this.setState({ validName: false })
    return this.setState({ validName: false })
  }
  handleInputScreenName = (e) => this.handleChangeWithValidate("screenName", e.target.value)
  handleInputProfile    = (e) => this.handleChangeWithValidate("profile",    e.target.value)
  handleInputSite       = (e) => this.handleChangeWithValidate("site",       e.target.value)
  handleInputTwitter    = (e) => this.handleChangeWithValidate("twitter",    e.target.value)
  handleBlurName = (e) => {
    this.handleTouch("name")
    const name = e.target.value
    if (name === this.props.user.name) return this.setState({ validName: true })
    if (!name || !(/^[a-z0-9._-]*$/).test(name)) return this.setState({ validName: false })

    this.setState({ loading: true })
    return api.validUserName(
      { name },
      () => this.setState({ loading: false, validName: true }),
      (error) => (
        this.setState({ loading: false, validName: false, errors: utils.setApiErrors(error.response.data) })
      )
    )
  }
  handleUpdateUser = () => {
    this.setState({ loading: true })
    api.updateUser(
      { originalName: this.props.user.name, ...this.state },
      ({ data: { name } }) => {
        window.location.href = path.user.show(name)
      },
      (error) => (
        this.setState({ loading: false, errors: utils.setApiErrors(error.response.data) })
      )
    )
  }
  handleToggleDestroyModal = () => this.setState(prevState => ({ destroyModal: !prevState.destroyModal }))
  handleTouch = (target) => {
    this.setState(prevState => ({ touch: Object.assign({}, prevState.touch, { [target]: true }) }))
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
    const { name, screenName, profile, site, twitter, destroyModal, errors, loading, validName, touch } = this.state
    const { user, history, handleToggleEdit } = this.props
    const updateIconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    const nameIconClass = () => {
      switch (true) {
        case loading:
          return "fa fa-circle-o-notch fa-spin"
        case errors.name && errors.name.length > 0:
          return "fa fa-exclamation-triangle"
        case validName:
          return "fa fa-check"
        default:
          return ""
      }
    }
    const nameFieldClass = classNames("input", {
      "is-danger":  errors.name && errors.name.length > 0,
      "is-success": touch.name && validName
    })
    return (
      <div className="card-content">
        <div className="content">
          <div style={{ marginBottom: "2em" }}>
            <div className="field" style={{ marginBottom: "2em" }}>
              <label className="label">ID</label>
              <div className="control has-icons-right">
                <FormWithValidate errorKey="name" target="user" errors={errors}>
                  <div>
                    <input
                      type="input"
                      className={nameFieldClass}
                      value={name}
                      onBlur={this.handleBlurName}
                      onChange={this.handleInputName}
                    />
                    <span className="icon is-small is-right">
                      <i className={nameIconClass()} />
                    </span>
                    <p className="help">
                      IDはあなたのページのURLに含まれます。
                    </p>
                    <p className="help has-text-weight-bold" style={{ wordBreak: "break-all" }}>
                      {utils.sharedUrl(`users/${name}`)}
                    </p>
                  </div>
                </FormWithValidate>
              </div>
            </div>

            <Field label="Screen name">
              <FormWithValidate errorKey="screenName" target="user" errors={errors}>
                <input
                  type="input"
                  className="input"
                  value={screenName}
                  onBlur={() => this.handleTouch("screenName")}
                  onChange={this.handleInputScreenName}
                />
              </FormWithValidate>
            </Field>

            <Field label="Profile">
              <FormWithValidate errorKey="profile" target="user" errors={errors}>
                <textarea
                  className="textarea"
                  value={profile}
                  onBlur={() => this.handleTouch("profile")}
                  onChange={this.handleInputProfile}
                />
              </FormWithValidate>
            </Field>

            <Field label="URL">
              <FormWithValidate errorKey="site" target="user" errors={errors}>
                <input
                  type="input"
                  className="input"
                  value={site}
                  onBlur={() => this.handleTouch("site")}
                  onChange={this.handleInputSite}
                />
              </FormWithValidate>
            </Field>

            <Field label="Twitter">
              <FormWithValidate errorKey="twitter" target="user" errors={errors}>
                <input
                  type="input"
                  className="input"
                  value={twitter}
                  onBlur={() => this.handleTouch("twitter")}
                  onChange={this.handleInputTwitter}
                />
              </FormWithValidate>
            </Field>
          </div>

          <p>
            <button
              type="button"
              className="button wide-button is-primary"
              disabled={loading}
              onClick={this.handleUpdateUser}
            >
              <span className="icon">
                <i className={updateIconClass} />
              </span>
              <span>Update Profile</span>
            </button>
          </p>
          <p>
            <button
              type="button"
              className="button wide-button"
              disabled={loading}
              onClick={handleToggleEdit}
            >
              <span className="icon">
                <i className="fa fa-undo" />
              </span>
              <span>Cancel</span>
            </button>
          </p>
          <p style={{ marginTop: "2em" }}>
            <button
              type="button"
              className="button is-danger wide-button"
              disabled={loading}
              onClick={this.handleToggleDestroyModal}
            >
              <span className="icon">
                <i className="fa fa-ban" />
              </span>
              <span>Delete User</span>
            </button>
          </p>
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
