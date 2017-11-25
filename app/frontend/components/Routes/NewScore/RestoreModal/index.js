import React, { Component } from "react"
import classNames           from "classnames"

export default class RestoreModal extends Component {
  handleClick = () => {
    const { restoreState, handleSetState, setInputText } = this.props
    handleSetState(restoreState)
    setInputText(restoreState.inputText)
    this.hideModal()
  }
  hideModal = () => this.props.handleResetLocalStorage()

  render() {
    const { restoreState } = this.props
    const modalClass = classNames("modal", { "is-active": restoreState })

    return (
      <div className={modalClass}>
        <div className="modal-background" role="presentation" onClick={this.hideModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Restore</p>
            <button className="delete" onClick={this.hideModal} />
          </header>
          <section className="modal-card-body">
            前回作業したデータが残っています。<br />
            復元しますか？
          </section>
          <footer className="modal-card-foot right">
            <button className="button is-success" onClick={this.handleClick}>
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
