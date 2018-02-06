import React, { Component } from "react"
import ModalCard            from "../../../commons/ModalCard"

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
      <ModalCard
        isActive={restoreState}
        title="Restore ?"
        icon="info-circle"
        hasButtons
        handleClick={this.handleClick}
        hideModal={this.hideModal}
      >
        前回作業したデータが残っています。<br />
        復元しますか？
      </ModalCard>
    )
  }
}
