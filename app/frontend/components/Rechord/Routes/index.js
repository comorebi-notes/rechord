import React, { Component }          from "react"
import { withRouter, Route, Switch } from "react-router-dom"

import Header       from "../../shared/Header"
import Footer       from "../../shared/Footer"
import FlashMessage from "../../shared/FlashMessage"
import NewScore     from "../NewScore"
import EditScore    from "../EditScore"
import ShowScore    from "../ShowScore"
import UserPage     from "../../UserPage"

class Routes extends Component {
  constructor(props) {
    super(props)
    const { location } = props
    location.state = {}
  }
  render() {
    const { currentUser, location } = this.props
    const { state } = location
    const showFlashMessage = state && state.flash && state.flash.length > 0

    const params = { currentUser }
    const RouteWithState = ({ component: Children, ...routeParams }) => (
      <Route
        {...routeParams}
        render={(props) => (
          <Children {...props} {...params} />
        )}
      />
    )

    return (
      <div className="main-content">
        <Header currentUser={currentUser} />
        {showFlashMessage && (
          <FlashMessage flash={state.flash} />
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
    )
  }
}

export default withRouter(Routes)
