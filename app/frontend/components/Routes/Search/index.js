import React, { Component } from "react"
import classNames           from "classnames"
import * as qs              from "qs"
import SearchTypeButtons    from "./SearchTypeButtons"
import SortSelect           from "./SortSelect"
import OrderButtons         from "./OrderButtons"
import ScoresSearch         from "./ScoresSearch"
import UsersSearch          from "./UsersSearch"
import * as utils           from "./searchUtils"
import { setTitle }         from "../../../utils"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"
import { history }          from "../../../utils/browser-dependencies"

export default class Search extends Component {
  constructor(props) {
    super(props)
    const { type } = props.match.params
    const { word, sort_key: sortKey, order } = qs.parse(props.location.search.substr(1))
    this.state = {
      word:    word    || "",
      sortKey: sortKey || utils.defaultSortKey,
      order:   order   || utils.defaultOrder,
      type:    type || "scores",
      result:  [],
      loading: true
    }
    if (type && word) {
      this.handleSearch(type, word)
    } else {
      this.state.loading = false
    }
  }
  componentDidMount = () => setTitle(`検索: ${this.state.word}`, this.props.history)
  handleSearch = (type, word, sortKey, order) => {
    let method
    switch (type) {
      case "scores": method = "searchScore"; break
      case "users":  method = "searchUser";  break
    }
    api[method](
      { query: qs.stringify({ word, sort_key: sortKey, order }) },
      (success) => this.setState({ result: success.data, loading: false }),
      () => this.props.history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
    )
  }
  handlePush = (type, word, sortKey, order, request = true) => {
    if (word.trim().length === 0) return false
    const query = { word }
    if (sortKey !== utils.defaultSortKey) query.sort_key = sortKey
    if (order   !== utils.defaultOrder)   query.order = order
    const searchPath = path.search(type, qs.stringify(query))
    // 再検索を行うか否か
    if (request) {
      return this.props.history.push(searchPath)
    } else {
      return history.pushState(null, null, searchPath)
    }
  }
  handleChangeType = (type) => this.handlePush(type, this.state.word, null, null)
  handleInputWord = (e) => this.setState({ word: e.target.value })
  handleKeyDown = (e) => {
    const { type, word, sortKey, order } = this.state
    if (e.keyCode === 13) this.handlePush(type, word, sortKey, order)
  }
  handleChangeSortKey = (e) => {
    this.setState({ sortKey: e.target.value })
    const { type, word, order } = this.state
    this.handlePush(type, word, e.target.value, order, false)
  }
  handleChangeOrder = (order) => {
    this.setState({ order })
    const { type, word, sortKey } = this.state
    this.handlePush(type, word, sortKey, order, false)
  }

  render() {
    const { type, result, word, sortKey, order, loading } = this.state
    const searchResult = () => {
      const sortedResult = utils.sortResult(result, sortKey, order)
      switch (type) {
        case "scores": return <ScoresSearch word={word} scores={sortedResult} />
        case "users":  return <UsersSearch  word={word} users={sortedResult} />
        default:       return ""
      }
    }
    return (
      <div className={classNames("search", { "loading-wrapper": loading })}>
        <div className="field is-grouped">
          <div className="control search-input has-icons-left">
            <span className="icon is-left" role="presentation" onClick={this.handleSearch}>
              <i className="fa fa-search" />
            </span>
            <input
              className="input"
              type="text"
              placeholder="search..."
              value={word}
              onChange={this.handleInputWord}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="control search-type">
            <SearchTypeButtons type={type} handleChangeType={this.handleChangeType} />
          </div>
          <div className="control is-hidden-mobile has-icons-left">
            <SortSelect sortKey={sortKey} type={type} handleChangeSortKey={this.handleChangeSortKey} />
          </div>
          <div className="control is-hidden-mobile">
            <OrderButtons currentOrder={order} handleChangeOrder={this.handleChangeOrder} />
          </div>
          <div className="control hits is-hidden-mobile">
            <strong>{result.length}</strong>
            <span>hits</span>
          </div>
        </div>

        <div className="field is-grouped is-only-mobile">
          <div className="control has-icons-left">
            <SortSelect sortKey={sortKey} type={type} handleChangeSortKey={this.handleChangeSortKey} />
          </div>
          <div className="control">
            <OrderButtons currentOrder={order} handleChangeOrder={this.handleChangeOrder} />
          </div>
          <div className="control hits">
            <strong>{result.length}</strong>
            <span>hits</span>
          </div>
        </div>

        {searchResult()}
      </div>
    )
  }
}
