import React, { Component } from "react"
import classNames           from "classnames"
import * as qs              from "qs"
import SortSelect           from "./SortSelect"
import ScoresResults        from "./ScoresResults"
import UsersResults         from "./UsersResults"
import * as utils           from "./cardsListUtils"
import { setTitle }         from "../../../utils"
import * as api             from "../../../api"
import * as path            from "../../../utils/path"

export default class CardsList extends Component {
  constructor(props) {
    super(props)
    const { word, sort } = qs.parse(props.location.search.substr(1))
    this.state = {
      word:    word || "",
      sort:    sort || utils.defaultSort,
      result:  [],
      loading: true
    }
    this.handleSearch(props.type, word, sort)
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
  handleSearch = (type, word, sort) => (
    api[type](
      { query: qs.stringify({ word, sort }) },
      (success) => this.setState({ result: success.data, loading: false }),
      () => this.props.history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
    )
  )
  handlePush = (type, word, sort) => {
    const query = { word }
    if (sort !== utils.defaultSort) query.sort = sort
    const searchPath = path.search(type, qs.stringify(query))
    this.props.history.push(searchPath)
  }
  handleInputWord = (e) => this.setState({ word: e.target.value })
  handleKeyDown = (e) => {
    const { word, sort } = this.state
    if (e.keyCode === 13) this.handlePush(this.props.type, word, sort)
  }
  handleChangeSort = (e) => {
    this.setState({ sort: e.target.value })
    const { word } = this.state
    this.handlePush(this.props.type, word, e.target.value)
  }

  render() {
    const { result, word, sort, loading } = this.state
    const { type } = this.props
    const searchResult = () => {
      switch (type) {
        case "scores": return <ScoresResults word={word} scores={result} />
        case "users":  return <UsersResults  word={word} users={result} />
        default:       return ""
      }
    }
    return (
      <div className={classNames("search", { "loading-wrapper": loading })}>
        <div className="field is-grouped search-control">
          <div className="control search-input has-icons-left">
            <span className="icon is-left">
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
            <SortSelect sort={sort} type={type} handleChangeSort={this.handleChangeSort} />
          </div>
          <div className="control hits is-hidden-mobile">
            <strong>{result.length}</strong>
            <span>{type}</span>
          </div>
        </div>

        <div className="field is-grouped is-only-mobile">
          <div className="control has-icons-left">
            <SortSelect sort={sort} type={type} handleChangeSort={this.handleChangeSort} />
          </div>
          <div className="control hits">
            <strong>{result.length}</strong>
            <span>{type}</span>
          </div>
        </div>

        {searchResult()}
      </div>
    )
  }
}
