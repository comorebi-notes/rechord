import React, { Component } from "react"
import classNames           from "classnames"
import * as api             from "../../../../api"
import { window }           from "../../../../utils/browser-dependencies"

export default class DestroyUserModal extends Component {
  handleDestroyUser = () => (
    api.destoryUser(
      { name: this.props.user.name },
      () => {
        window.location.href = "/"
      },
      () => this.props.history.push("/", { flash: ["error", "削除に失敗しました。"] })
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
            <p className="modal-card-title">Destroy ?</p>
            <a className="delete" role="presentation" onClick={this.hideModal} />
          </header>
          <section className="modal-card-body">
            ユーザを削除すると、そのユーザで登録されたスコアもすべて削除されます。<br />
            本当にユーザを削除しますか？
          </section>
          <footer className="modal-card-foot right">
            <a className="button is-danger" role="presentation" onClick={this.handleDestroyUser}>
              Yes
            </a>
            <a className="button" role="presentation" onClick={this.hideModal}>
              No
            </a>
          </footer>
        </div>
        <a className="modal-close is-large" role="presentation" onClick={this.hideModal} />
      </div>
    )
  }
}
