import React, { Component }          from "react"
import { withRouter, Route, Switch } from "react-router-dom"

import Header        from "../commons/Header"
import TabBar        from "../commons/TabBar"
import Footer        from "../commons/Footer"
import FlashMessage  from "../commons/FlashMessage"
import NewScore      from "./NewScore"
import EditScore     from "./EditScore"
import ShowScore     from "./ShowScore"
import User          from "./User"
import About         from "./About"
import Terms         from "./Terms"
import * as path     from "../../utils/path"
import { window }    from "../../utils/browser-dependencies"

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
      <Route
        {...routeParams}
        render={props => <Children {...props} {...params} />}
      />
    )
    const RouteWithStateContainer = (props) => (
      <SectionContainer>
        <RouteWithState {...props} />
      </SectionContainer>
    )

    const hideTabBar = location.pathname !== path.about

    return (
      <div className="main-content">
        <Header currentUser={currentUser} pathname={location.pathname} />
        {hideTabBar && (
          <TabBar currentUser={currentUser} currentPath={location.pathname} location={location} />
        )}

        <Switch>
          <RouteWithStateContainer path={path.root}                 component={NewScore} exact />
          <RouteWithStateContainer path={path.user.show(":name")}   component={User} />
          <RouteWithState          path={path.about}                component={About} exact />
          <RouteWithStateContainer path={path.terms}                component={Terms} exact />
          <RouteWithStateContainer path={path.score.show(":token")} component={ShowScore} exact />
          <RouteWithStateContainer path={path.score.edit(":token")} component={EditScore} />
        </Switch>

        <Footer />
      </div>
    )
  }
}

export default withRouter(Container)
