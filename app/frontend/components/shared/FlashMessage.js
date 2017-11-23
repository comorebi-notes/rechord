import React, { PureComponent } from "react"

export default class FlashMessage extends PureComponent {
  constructor() {
    super()
    this.state = { show: true }
  }
  componentWillReceiveProps() {
    this.setState({ show: true })
  }
  handleDelete = () => this.setState({ show: false })
  render() {
    const { flash } = this.props
    const { show } = this.state
    const flashStyle = { display: (show ? "block" : "none") }
    return (
      <div className="container flash-message" style={flashStyle}>
        <div className="notification is-success">
          <button className="delete" onClick={this.handleDelete} />
          <span className="icon is-medium">
            <i className="fa fa-lg fa-check-circle" />
          </span>
          <span>{flash}</span>
        </div>
      </div>
    )
  }
}
