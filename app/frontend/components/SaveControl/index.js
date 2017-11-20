import React, { Component } from "react"
import * as api             from "../../api"

export default class SaveControl extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error:   ""
    }
  }
  handleClick = () => {
    const func = this.props.update ? "updateScore" : "createScore"
    this.setState({ loading: true })
    api[func](
      this.props,
      (success) => {
        this.setState({
          loading: false,
          error: ""
        })
        this.props.handleSetState({
          url: success.data,
          modal: true
        })
      },
      (error) => (
        this.setState({
          loading: false,
          error: error.response.data
        })
      )
    )
  }
  render() {
    const { update } = this.props
    const { loading, error } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    const buttonLabel = update ? "update" : "save & share"
    return (
      <div className="share has-text-centered">
        <button
          className="button is-primary is-medium"
          onClick={this.handleClick}
          disabled={loading}
        >
          <span className="icon">
            <i className={iconClass} />
          </span>
          <span>{buttonLabel}</span>
        </button>
        {error.length > 0 && (
          <p className="has-text-danger" style={{ marginTop: 4 }}>{error}</p>
        )}
      </div>
    )
  }
}
