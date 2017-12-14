import React, { PureComponent } from "react"
import { withRouter }           from "react-router-dom"

import TabItems       from "./TabItems"
import HasAddonsField from "../HasAddonsField"
import * as path      from "../../../utils/path"

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
          <HasAddonsField>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="search..."
                value={searchText}
                onChange={this.handleInput}
                onKeyDown={this.handleKeyDown}
              />
            </div>
            <div className="control">
              <button className="button is-primary" onClick={this.handleSearch}>
                <span className="icon">
                  <i className="fa fa-search" />
                </span>
              </button>
            </div>
          </HasAddonsField>
        </div>
      </div>
    )
  }
}

export default withRouter(TabBar)
