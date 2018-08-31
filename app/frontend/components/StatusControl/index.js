import React, { Component } from "react"

export default class StatusControl extends Component {
  handleChangeStatus = (e) => {
    this.props.handleSetState({ status: e.target.value })
  }
  render() {
    const { status } = this.props
    const radioParams = [
      {
        label: "Public",
        description: <p>保存されたスコアは誰でも閲覧可能になります。</p>,
        value: "published"
      }, {
        label: "Private",
        description: (
          <p>
            保存されたスコアは非公開になります。<br />
            あなた以外には見えず、検索にも表示されません。
          </p>
        ),
        value: "closed"
      }
    ]
    const renderRadioComponent = (param) => (
      <span className="has-checkradio" key={param.value}>
        <input
          type="radio"
          name="status"
          className="is-checkradio"
          id={param.value}
          value={param.value}
          checked={status === param.value}
          onChange={this.handleChangeStatus}
        />
        <label htmlFor={param.value}>{param.label}</label>
      </span>
    )
    const currentParam = radioParams.find(param => param.value === status) || {}
    return (
      <div className="field status-control">
        <div className="control radio-buttons">
          {radioParams.map(renderRadioComponent)}
        </div>
        <div className="current-status-description">
          {currentParam.description}
        </div>
      </div>
    )
  }
}
