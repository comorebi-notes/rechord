import React, { Component } from "react"
import classNames           from "classnames"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"
import { window }           from "../../../../utils/browser-dependencies"

export default class DestroyUserModal extends Component {
  handleDestroyUser = () => (
    api.destoryUser(
      { name: this.props.user.name },
      () => {
        window.location.href = path.root
      },
      () => this.props.history.push(path.current, { flash: ["error", "削除に失敗しました。"] })
    )
  )
  hideModal = () => this.props.handleToggleDestroyModal()

  render() {
    const { active } = this.props
    const modalClass = classNames("modal", { "is-active": active })

    return (
      <div className={modalClass}>
        <div className="modal-background" role="presentation" onClick={this.hideModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <span className="icon">
                <i className="fa fa-exclamation-triangle" />
              </span>
              <span>Caution</span>
            </p>
            <button className="delete" onClick={this.hideModal} />
          </header>
          <section className="modal-card-body">
            ユーザを削除すると、そのユーザで登録されたスコアもすべて削除されます。<br />
            本当にユーザを削除しますか？
          </section>
          <footer className="modal-card-foot right">
            <button className="button is-danger" onClick={this.handleDestroyUser}>
              Yes
            </button>
            <button className="button" onClick={this.hideModal}>
              No
            </button>
          </footer>
        </div>
        <button className="modal-close is-large" onClick={this.hideModal} />
      </div>
    )
  }
}
