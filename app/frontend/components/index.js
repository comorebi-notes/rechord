import React, { Component } from "react"
import { Router }           from "react-router-dom"
import createHistory        from "history/createBrowserHistory"
import ReactGA              from "react-ga"

import Routes     from "./Routes"
import { window } from "../utils/browser-dependencies"

export default class Rechord extends Component {
  constructor() {
    super()
    const { uaId } = window.data
    const history = createHistory()
    history.pushPageView = () => {}

    if (uaId.length > 0) {
      ReactGA.initialize(uaId)
      ReactGA.pageview(window.location.pathname)
      // history.listen(location => {
      //   ReactGA.set({ page: location.pathname })
      //   ReactGA.pageview(location.pathname)
      // })

      // ページタイトルはロード後に設定されるため、
      // 各 Component の componentDidMount で個別に設定
      history.pushPageView = () => {
        ReactGA.set({ page: window.location.pathname })
        ReactGA.pageview(window.location.pathname)
      }
    }
    this.state = { history }
  }
  render() {
    const { currentUser, flash } = window.data
    const { history } = this.state
    return (
      <Router history={history}>
        <Routes currentUser={currentUser} flash={flash} />
      </Router>
    )
  }
}
