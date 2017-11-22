import React, { Component }             from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import NewScore  from "./NewScore"
import EditScore from "./EditScore"
import ShowScore from "./ShowScore"
import UserPage  from "../UserPage"

export default class Rechord extends Component {
  constructor() {
    super()
    this.state = { flash: "" }
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/"            component={NewScore} exact />
          <Route path="/users/:id"   component={UserPage} />
          <Route path="/:token"      component={ShowScore} exact />
          <Route path="/:token/edit" component={EditScore} />
        </Switch>
      </BrowserRouter>
    )
  }
}
