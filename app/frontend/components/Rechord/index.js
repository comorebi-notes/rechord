import React, { Component }     from "react"
import { BrowserRouter, Route } from "react-router-dom"

import NewScore  from "./NewScore"
import EditScore from "./EditScore"
import ShowScore from "./ShowScore"
import UserPage  from "../UserPage"

export default class Rechord extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/users/:id"   component={UserPage} />
          <Route path="/"            component={NewScore}  exact />
          <Route path="/:token/edit" component={EditScore} exact />
          <Route path="/:token"      component={ShowScore} exact />
        </div>
      </BrowserRouter>
    )
  }
}
