import React, { Component } from "react"
import Modal                from "../../../commons/modal"

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
    return (
      <Modal
        isActive={restoreState}
        title="Restore ?"
        icon="info-circle"
        hasButtons
        handleClick={this.handleClick}
        hideModal={this.hideModal}
      >
        前回作業したデータが残っています。<br />
        復元しますか？
      </Modal>
    )
  }
}
