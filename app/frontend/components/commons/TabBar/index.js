import React, { PureComponent } from "react"
import { withRouter }           from "react-router-dom"

import TabItems     from "./TabItems"
import LoginModal   from "../LoginModal"
import * as path    from "../../../utils/path"
import { document } from "../../../utils/browser-dependencies"

class TabBar extends PureComponent {
  constructor() {
    super()
    this.state = { queryWord: "", isActiveModal: false }
  }
  handleInput       = (e) => this.setState({ queryWord: e.target.value })
  handleKeyDown     = (e) => e.keyCode === 13 && this.handleSearch()
  handleClear       = ()  => this.setState({ queryWord: "" })
  handleToggleModal = ()  => this.setState({ isActiveModal: !this.state.isActiveModal })
  handleSearch = () => {
    const { history } = this.props
    const { queryWord } = this.state
    if (queryWord.trim().length > 0) {
      history.push(path.search(`word=${queryWord}`, path.score.index())) // デフォルトはスコア検索
      this.handleClear()
      document.activeElement.blur()
    }
  }
  render() {
    const { currentUser, currentPath } = this.props
    const { queryWord, isActiveModal } = this.state
    return (
      <div>
        <div className="tabs tab-bar">
          <div className="container">
            <TabItems currentUser={currentUser} currentPath={currentPath} handleToggleModal={this.handleToggleModal} />
            <div className="field is-hidden-mobile">
              <div className="control has-icons-left">
                <span className="icon is-left can-click" onClick={this.handleSearch}>
                  <i className="fa fa-search fa-lg" />
                </span>
                <input
                  className="input"
                  type="text"
                  placeholder="search..."
                  value={queryWord}
                  onChange={this.handleInput}
                  onKeyDown={this.handleKeyDown}
                />
              </div>
            </div>
          </div>
        </div>
        {!currentUser.name && <LoginModal active={isActiveModal} hideModal={this.handleToggleModal} />}
      </div>
    )
  }
}

export default withRouter(TabBar)
