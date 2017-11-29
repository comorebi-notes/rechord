import React, { Component } from "react"
import classNames           from "classnames"
import * as api             from "../../../../api"
import * as path            from "../../../../utils/path"

export default class DestroyScoreModal extends Component {
  handleDestroyScore = () => {
    const { history, token, user: { name } } = this.props
    api.destroyScore(
      { token },
      () => history.push(path.user.show(name), { flash: ["success", "削除に成功しました。"] }),
      () => history.push(path.current, { flash: ["error", "削除に失敗しました。"] })
    )
  }
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
            <a className="delete" role="presentation" onClick={this.hideModal} />
          </header>
          <section className="modal-card-body">
            本当にスコアを削除しますか？
          </section>
          <footer className="modal-card-foot right">
            <a className="button is-danger" role="presentation" onClick={this.handleDestroyScore}>
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
