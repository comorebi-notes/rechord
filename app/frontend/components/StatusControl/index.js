import React, { Component } from "react"

export default class StatusControl extends Component {
  handleChangeStatus = (e) => {
    this.props.handleSetState({ status: e.target.value })
  }
  render() {
    const { status } = this.props
    const radioParams = [
      { label: "Public",  value: "published" },
      { label: "Private", value: "closed" }
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
    return (
      <div className="field status-control">
        <div className="control radio-buttons">
          {radioParams.map(renderRadioComponent)}
        </div>
      </div>
    )
  }
}
