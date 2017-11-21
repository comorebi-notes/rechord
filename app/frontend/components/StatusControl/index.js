import React, { Component } from "react"

export default class StatusControl extends Component {
  handleChangeStatus = (e) => this.props.handleSetState({ status: e.target.value })
  render() {
    const { status } = this.props
    const radioParams = [
      { label: "Public",  value: "published" },
      { label: "Private", value: "closed" }
    ]
    const renderRadioComponent = (param) => (
      <label className="radio" key={param.value}>
        <input
          type="radio"
          name="status"
          value={param.value}
          checked={status === param.value}
          onChange={this.handleChangeStatus}
        />
        {param.label}
      </label>
    )
    return (
      <div className="field" style={{ marginTop: "1.5em", fontWeight: "bold" }}>
        <div className="control radio-buttons">
          {radioParams.map(renderRadioComponent)}
        </div>
      </div>
    )
  }
}
