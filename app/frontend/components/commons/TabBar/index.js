import React, { PureComponent } from "react"
import { withRouter }           from "react-router-dom"

import TabItems  from "./TabItems"
import * as path from "../../../utils/path"

class TabBar extends PureComponent {
  constructor() {
    super()
    this.state = { query: "" }
  }
  handleInput   = (e) => this.setState({ query: e.target.value })
  handleKeyDown = (e) => e.keyCode === 13 && this.handleSearch()
  handleClear   = ()  => this.setState({ query: "" })
  handleSearch = () => {
    const { history } = this.props
    const { query } = this.state
    if (query.trim().length > 0) {
      history.push(path.search("scores", query)) // デフォルトはスコア検索
      this.handleClear()
    }
  }
  render() {
    const { currentUser, currentPath } = this.props
    const { query } = this.state
    return (
      <div className="tabs tab-bar">
        <div className="container">
          <TabItems currentUser={currentUser} currentPath={currentPath} />
          <div className="field">
            <div className="control has-icons-left">
              <span className="icon is-left can-click" role="presentation" onClick={this.handleSearch}>
                <i className="fa fa-search fa-lg" />
              </span>
              <input
                className="input"
                type="text"
                placeholder="search..."
                value={query}
                onChange={this.handleInput}
                onKeyDown={this.handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TabBar)
