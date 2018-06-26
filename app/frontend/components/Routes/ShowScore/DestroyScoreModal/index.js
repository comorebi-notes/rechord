import React, { Component } from "react"
import ModalCard            from "../../../commons/ModalCard"
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
    return (
      <ModalCard
        isActive={active}
        title="注意"
        icon="exclamation-triangle"
        hasButtons
        buttonColor="danger"
        handleClick={this.handleDestroyScore}
        hideModal={this.hideModal}
      >
        一度削除したスコアは復元できません。<br />
        本当にスコアを削除しますか？
      </ModalCard>
    )
  }
}
