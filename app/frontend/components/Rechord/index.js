import React, { Component }             from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Header       from "../shared/Header"
import Footer       from "../shared/Footer"
import FlashMessage from "../shared/FlashMessage"
import NewScore     from "./NewScore"
import EditScore    from "./EditScore"
import ShowScore    from "./ShowScore"
import UserPage     from "../UserPage"
import { window }   from "../../utils/browser-dependencies"

export default class Rechord extends Component {
  constructor() {
    super()
    this.state = { flash: "" }
  }
  handleGlobalState = (state) => this.setState(state)

  render() {
    const { handleGlobalState } = this
    const { flash } = this.state
    const { currentUser } = window.data
    const params = { handleGlobalState, flash, currentUser }

    const RouteWithState = ({ component: Children, ...routeParams }) => (
      <Route
        {...routeParams}
        render={(props) => (
          <Children {...props} {...params} />
        )}
      />
    )
    return (
      <BrowserRouter>
        <div className="main-content">
          <Header currentUser={currentUser} />
          {flash.length > 0 && (
            <FlashMessage flash={flash} />
          )}

          <section className="section">
            <div className="container">
              <Switch>
                <RouteWithState path="/"            component={NewScore} exact />
                <RouteWithState path="/users/:id"   component={UserPage} />
                <RouteWithState path="/:token"      component={ShowScore} exact />
                <RouteWithState path="/:token/edit" component={EditScore} />
              </Switch>
            </div>
          </section>

          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}
