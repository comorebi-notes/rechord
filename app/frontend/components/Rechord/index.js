import React, { Component } from "react"
import { BrowserRouter }    from "react-router-dom"

import Routes       from "./Routes"
import { window }   from "../../utils/browser-dependencies"

export default class Rechord extends Component {
  render() {
    const { currentUser } = window.data
    return (
      <BrowserRouter>
        <Routes currentUser={currentUser} />
      </BrowserRouter>
    )
  }
}
