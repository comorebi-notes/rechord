import React, { Component }          from "react"
import { withRouter, Route, Switch } from "react-router-dom"

import Header       from "../shared/Header"
import Footer       from "../shared/Footer"
import FlashMessage from "../shared/FlashMessage"
import NewScore     from "../Routes/NewScore"
import EditScore    from "../Routes/EditScore"
import ShowScore    from "../Routes/ShowScore"
import ShowUser     from "../Routes/ShowUser"

class Container extends Component {
  constructor(props) {
    super(props)
    const { location } = props
    location.state = {}
  }
  render() {
    const { currentUser, location } = this.props
    const { state } = location
    const showFlashMessage = state && state.flash

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

        <section className="section">
          {showFlashMessage && (
            <FlashMessage flash={state.flash} />
          )}
          <div className="container">
            <Switch>
              <RouteWithState path="/"            component={NewScore} exact />
              <RouteWithState path="/users/:id"   component={ShowUser} />
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

export default withRouter(Container)
