import React, { Component }          from "react"
import { withRouter, Route, Switch } from "react-router-dom"
import classNames                    from "classnames"

import Header       from "../commons/Header"
import TabBar       from "../commons/TabBar"
import Footer       from "../commons/Footer"
import FlashMessage from "../commons/FlashMessage"
import NewScore     from "./NewScore"
import EditScore    from "./EditScore"
import ShowScore    from "./ShowScore"
import User         from "./User"
import About        from "./About"
import Terms        from "./Terms"
import Changelog    from "./Changelog"
import ScoresList   from "./ScoresList"
import UsersList    from "./UsersList"
import FavsList     from "./FavsList"
import * as utils   from "../../utils"
import * as path    from "../../utils/path"
import * as api     from "../../api"
import { window }   from "../../utils/browser-dependencies"

class Container extends Component {
  constructor(props) {
    super(props)
    const { location, data: { currentUser, currentVersion, flash, notifications } } = props
    location.state = flash.length > 0 ? { flash: flash[0] } : {}
    this.state = { loading: false, currentUser, currentVersion, notifications }
  }
  componentWillReceiveProps({ location }) {
    if (location.pathname !== this.props.location.pathname) window.scrollTo(0, 0)
    this.handleTransition()
  }
  handleTransition = () => {
    const { history } = this.props
    this.setState({ loading: true })
    api.getStatus(
      ({ data: { currentUser, currentVersion, notifications } }) => {
        if (currentVersion !== this.state.currentVersion) window.location.reload() // 更新があればブラウザをリロード
        this.setState({ loading: false, currentUser, notifications })
      },
      (errors) => history.push(path.root, utils.setFlashError(errors))
    )
  }
  render() {
    const { location } = this.props
    const { loading, currentUser, notifications } = this.state
    const { state } = location

    const containerClass = classNames("container", { "loading-wrapper": loading })
    const showFlashMessage = state && state.flash
    const hideTabBar = location.pathname === path.about
    const params = { currentUser }

    const RouteWithState = ({ component: Children, ...routeParams }) => (
      <Route
        {...routeParams}
        render={props => <Children {...props} {...params} />}
      />
    )
    const RouteWithStateContainer = (props) => (
      <section className="section root-section">
        {showFlashMessage && <FlashMessage flash={state.flash} />}
        <div className={containerClass}>
          {!loading && (
            <RouteWithState {...props} />
          )}
        </div>
      </section>
    )

    return (
      <div className="main-content">
        <Header
          currentUser={currentUser}
          pathname={location.pathname}
          notifications={notifications}
          loading={loading}
        />
        {!hideTabBar && (
          <TabBar currentUser={currentUser} currentPath={location.pathname} location={location} />
        )}

        <Switch>
          <RouteWithStateContainer path={path.root}                 component={NewScore} exact />
          <RouteWithState          path={path.about}                component={About} exact />
          <RouteWithStateContainer path={path.terms}                component={Terms} exact />
          <RouteWithStateContainer path={path.changelog}            component={Changelog} exact />
          <RouteWithStateContainer path={path.score.index()}        component={ScoresList} exact />
          <RouteWithStateContainer path={path.user.index()}         component={UsersList} exact />
          <RouteWithStateContainer path={path.fav.index()}          component={FavsList} exact />
          <RouteWithStateContainer path={path.user.show(":name")}   component={User} />
          <RouteWithStateContainer path={path.score.show(":token")} component={ShowScore} exact />
          <RouteWithStateContainer path={path.score.edit(":token")} component={EditScore} />
        </Switch>

        <Footer />
      </div>
    )
  }
}

export default withRouter(Container)
