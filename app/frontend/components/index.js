import React, { Component } from "react"
import { BrowserRouter }    from "react-router-dom"

import Container  from "./Container"
import { window } from "../utils/browser-dependencies"

export default class Rechord extends Component {
  render() {
    const { currentUser, flash } = window.data
    return (
      <BrowserRouter>
        <Container currentUser={currentUser} flash={flash} />
      </BrowserRouter>
    )
  }
}
