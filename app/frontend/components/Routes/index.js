import React, { Component }          from "react"
import { withRouter, Route, Switch } from "react-router-dom"

import Header       from "../commons/Header"
import Footer       from "../commons/Footer"
import FlashMessage from "../commons/FlashMessage"
import NewScore     from "./NewScore"
import EditScore    from "./EditScore"
import ShowScore    from "./ShowScore"
import User         from "./User"
import About        from "./About"
import * as path    from "../../utils/path"
import { window }   from "../../utils/browser-dependencies"

class Container extends Component {
  constructor(props) {
    super(props)
    const { location, flash } = props
    location.state = flash.length > 0 ? { flash: flash[0] } : {}
  }
  componentWillReceiveProps({ location }) {
    if (location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0)
    }
  }
  render() {
    const { currentUser, location } = this.props
    const { state } = location
    const showFlashMessage = state && state.flash

    const params = { currentUser }
    const SectionContainer = ({ children }) => (
      <section className="section">
        {showFlashMessage && <FlashMessage flash={state.flash} />}
        <div className="container">
          {children}
        </div>
      </section>
    )
    const RouteWithState = ({ component: Children, ...routeParams }) => (
      <SectionContainer>
        <Route
          {...routeParams}
          render={props => <Children {...props} {...params} />}
        />
      </SectionContainer>
    )

    return (
      <div className="main-content">
        <Header currentUser={currentUser} pathname={location.pathname} />

        <Switch>
          <RouteWithState path={path.root}                 component={NewScore} exact />
          <RouteWithState path={path.user.show(":name")}   component={User} />
          <Route          path={path.about}                component={About} exact />
          <RouteWithState path={path.score.show(":token")} component={ShowScore} exact />
          <RouteWithState path={path.score.edit(":token")} component={EditScore} />
        </Switch>

        <Footer />
      </div>
    )
  }
}

export default withRouter(Container)
