import React, { Component } from "react"
import classNames           from "classnames"
import * as qs              from "qs"
import SortSelect           from "./SortSelect"
import OrderButtons         from "./OrderButtons"
import ScoresResults        from "./ScoresResults"
import UsersResults         from "./UsersResults"
import * as utils           from "./cardsListUtils"
import { setTitle }         from "../../../utils"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"

export default class CardsList extends Component {
  constructor(props) {
    super(props)
    const { word, sort_key: sortKey, order } = qs.parse(props.location.search.substr(1))
    this.state = {
      word:    word    || "",
      sortKey: sortKey || utils.defaultSortKey,
      order:   order   || utils.defaultOrder,
      result:  [],
      loading: true
    }
    this.handleSearch(props.type, word)
  }
  componentDidMount = () => {
    const { word } = this.state
    const { type, history } = this.props
    const humanLabel = {
      scores: "スコア",
      users:  "ユーザ"
    }
    const title = word ? `検索: ${word}` : `${humanLabel[type]}一覧`
    setTitle(title, history)
  }
  handleSearch = (type, word, sortKey, order) => (
    api[type](
      { query: qs.stringify({ word, sort_key: sortKey, order }) },
      (success) => this.setState({ result: success.data, loading: false }),
      () => this.props.history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
    )
  )
  handlePush = (type, word, sortKey, order) => {
    const query = { word }
    if (sortKey !== utils.defaultSortKey) query.sort_key = sortKey
    if (order   !== utils.defaultOrder)   query.order = order
    const searchPath = path.search(type, qs.stringify(query))
    this.props.history.push(searchPath)
  }
  handleInputWord = (e) => this.setState({ word: e.target.value })
  handleKeyDown = (e) => {
    const { word, sortKey, order } = this.state
    if (e.keyCode === 13) this.handlePush(this.props.type, word, sortKey, order)
  }
  handleChangeSortKey = (e) => {
    this.setState({ sortKey: e.target.value })
    const { word, order } = this.state
    this.handlePush(this.props.type, word, e.target.value, order)
  }
  handleChangeOrder = (order) => {
    this.setState({ order })
    const { word, sortKey } = this.state
    this.handlePush(this.props.type, word, sortKey, order)
  }

  render() {
    const { result, word, sortKey, order, loading } = this.state
    const { type } = this.props
    const searchResult = () => {
      const sortedResult = utils.sortResult(result, sortKey, order)
      switch (type) {
        case "scores": return <ScoresResults word={word} scores={sortedResult} />
        case "users":  return <UsersResults  word={word} users={sortedResult} />
        default:       return ""
      }
    }
    return (
      <div className={classNames("search", { "loading-wrapper": loading })}>
        <div className="field is-grouped search-control">
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
          <div className="control is-hidden-mobile has-icons-left">
            <SortSelect sortKey={sortKey} type={type} handleChangeSortKey={this.handleChangeSortKey} />
          </div>
          <div className="control is-hidden-mobile">
            <OrderButtons currentOrder={order} handleChangeOrder={this.handleChangeOrder} />
          </div>
          <div className="control hits is-hidden-mobile">
            <strong>{result.length}</strong>
            <span>{type}</span>
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
