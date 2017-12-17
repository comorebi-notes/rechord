import React, { PureComponent } from "react"
import { withRouter }           from "react-router-dom"

import TabItems  from "./TabItems"
import * as path from "../../../utils/path"

class TabBar extends PureComponent {
  constructor() {
    super()
    this.state = { searchText: "" }
  }
  handleInput   = (e) => this.setState({ searchText: e.target.value })
  handleKeyDown = (e) => {
    if (e.keyCode === 13) this.handleSearch()
  }
  handleSearch = () => {
    const { history } = this.props
    const { searchText } = this.state
    if (searchText.length > 0) {
      history.push(path.search(searchText))
    }
  }
  render() {
    const { currentUser, currentPath } = this.props
    const { searchText } = this.state
    return (
      <div className="tabs tab-bar">
        <div className="container">
          <ul>
            <TabItems currentUser={currentUser} currentPath={currentPath} />
          </ul>
          <div className="field">
            <div className="control has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="search..."
                value={searchText}
                onChange={this.handleInput}
                onKeyDown={this.handleKeyDown}
              />
              <span className="icon is-right can-click" role="presentation" onClick={this.handleSearch}>
                <i className="fa fa-search fa-lg" />
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TabBar)
