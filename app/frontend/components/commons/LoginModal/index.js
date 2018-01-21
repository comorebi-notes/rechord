import React, { Component } from "react"
import classNames           from "classnames"

import * as path  from "../../../utils/path"

export default class LoginModal extends Component {
  render() {
    const { active, hideModal } = this.props
    const modalClass = classNames("modal", "login", { "is-active": active })
    const renderButton = ({ service, label }) => (
      <a
        key={service}
        href={path.auth[service]}
        className={classNames("button", "is-info", "is-medium", service)}
      >
        <span className="icon">
          <i className={classNames("fa", `fa-${service}`)} />
        </span>
        <span>{label}</span>
      </a>
    )
    const services = [
      { service: "twitter",  label: "Twitter" },
      { service: "facebook", label: "Facebook" },
      { service: "google",   label: "Google" },
      { service: "tumblr",   label: "tumblr" },
      { service: "github",   label: "GitHub" }
    ]
    return (
      <div className={modalClass}>
        <div className="modal-background" role="presentation" onClick={hideModal} />
        <div className="modal-content">
          <div className="box">
            <h1 className="has-text-centered title is-4">
              login or register
            </h1>
            {services.map(renderButton)}
            <p className="is-size-7" style={{ marginBottom: ".8em" }}>
              ユーザ登録をすることで、投稿したスコアを管理したり、他人のスコアにいいねを付けたりすることができます。
            </p>
            <p className="is-size-7">
              あなたが入力した外部サービスのパスワード等は、管理人を含め第三者に見られることはありません。
            </p>
          </div>
        </div>
        <button className="modal-close is-large" onClick={hideModal} />
      </div>
    )
  }
}
