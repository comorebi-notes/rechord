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
  handleSave = () => {
    this.setState({ loading: true })
    api.createScore(
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
    const { loading, error } = this.state
    const iconClass = loading ? "fa fa-circle-o-notch fa-spin" : "fa fa-save"
    return (
      <div>
        <div className="share has-text-centered">
          <button
            className="button is-primary is-medium"
            onClick={this.handleSave}
            disabled={loading}
          >
            <span className="icon">
              <i className={iconClass} />
            </span>
            <span>save & share</span>
          </button>
          {error.length > 0 && (
            <p>{error}</p>
          )}
        </div>
      </div>
    )
  }
}
