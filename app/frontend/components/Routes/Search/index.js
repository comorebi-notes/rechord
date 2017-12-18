import React, { Component } from "react"
import classNames           from "classnames"
import * as qs              from "qs"
import SearchTypeButtons    from "./SearchTypeButtons"
import SortSelect           from "./SortSelect"
import OrderButtons         from "./OrderButtons"
import ScoresSearch         from "./ScoresSearch"
import UsersSearch          from "./UsersSearch"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"
import * as utils           from "./searchUtils"

export default class Search extends Component {
  constructor(props) {
    super(props)
    const { type } = props.match.params
    const query = qs.parse(props.location.search.substr(1))
    this.state = {
      query:   query.word || "",
      sortKey: "updated_at",
      order:   "desc",
      type:    type || "scores",
      result:  [],
      loading: true
    }
    this.handleSearch(type, query.word)
  }
  handleSearch = (type, query) => {
    let method
    switch (type) {
      case "scores": method = "searchScore"; break
      case "users":  method = "searchUser";  break
    }
    api[method](
      { query: `word=${query}` },
      (success) => this.setState({ result: success.data, loading: false }),
      () => this.props.history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
    )
  }
  handlePush = (type, query) => this.props.history.push(path.search(type, `word=${query}`))
  handleChangeType = (type) => this.handlePush(type, this.state.query, true)
  handleInputQuery = (e) => this.setState({ query: e.target.value })
  handleKeyDown = (e) => {
    if (e.keyCode === 13) this.handlePush(this.state.type, this.state.query)
  }
  handleChangeSortKey = (e) => this.setState({ sortKey: e.target.value })
  handleChangeOrder = (order) => this.setState({ order })

  render() {
    const { type, query, result, sortKey, order, loading } = this.state
    const searchResult = () => {
      const sortedResult = utils.sortResult(result, sortKey, order)
      switch (type) {
        case "scores": return <ScoresSearch scores={sortedResult} />
        case "users":  return <UsersSearch users={sortedResult} />
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
              value={query}
              onChange={this.handleInputQuery}
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
