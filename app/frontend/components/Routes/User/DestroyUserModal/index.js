import React, { Component } from "react"
import ModalCard            from "../../../commons/ModalCard"
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
    return (
      <ModalCard
        isActive={active}
        title="注意"
        icon="exclamation-triangle"
        hasButtons
        buttonColor="danger"
        handleClick={this.handleDestroyUser}
        hideModal={this.hideModal}
      >
        ユーザを削除すると、そのユーザで登録されたスコアもすべて削除されます。<br />
        本当にユーザを削除しますか？
      </ModalCard>
    )
  }
}
