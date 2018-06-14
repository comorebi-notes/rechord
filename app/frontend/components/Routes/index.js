import React, { Component }          from "react"
import { withRouter, Route, Switch } from "react-router-dom"
import * as qs                       from "qs"

import Header                 from "../commons/Header"
import TabBar                 from "../commons/TabBar"
import Footer                 from "../commons/Footer"
import FlashMessage           from "../commons/FlashMessage"
import NewScore               from "./NewScore"
import EditScore              from "./EditScore"
import ShowScore              from "./ShowScore"
import User                   from "./User"
import About                  from "./About"
import Terms                  from "./Terms"
import Changelog              from "./Changelog"
import ScoresList             from "./ScoresList"
import UsersList              from "./UsersList"
import FavsList               from "./FavsList"
import * as localStorageState from "../../utils/localStorageState"
import * as path              from "../../utils/path"
import * as api               from "../../api"
import { window }             from "../../utils/browser-dependencies"

class Container extends Component {
  constructor(props) {
    super(props)
    const { currentUser, location, flash } = props
    location.state = flash.length > 0 ? { flash: flash[0] } : {}
    this.state = { currentUser, loading: false }
  }
  componentWillReceiveProps({ location }) {
    if (location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0)
    }
    this.handleTransition()
  }
  handleTransition = () => {
    const { history } = this.props
    const localVersion = localStorageState.getCurrentVersion()

    this.setState({ loading: true })
    api.getStatus(
      null,
      (success) => {
        const { currentUser, currentVersion, isPermitted, notification } = success.data
        this.setState({ loading: false, currentUser })
        if (currentVersion !== localVersion) {
          localStorageState.setCurrentVersion(currentVersion)
          if (localVersion) window.location.reload() // 更新があった場合はブラウザをリロード
        }
      },
      () => history.push(path.root, { flash: ["error", "読み込みに失敗しました。"] })
    )
  }
  render() {
    const { location } = this.props
    const { currentUser } = this.state
    const { state } = location

    const showFlashMessage = state && state.flash
    const hideTabBar = location.pathname !== path.about
    const params = { currentUser }

    const RouteWithState = ({ component: Children, ...routeParams }) => (
      <Route
        {...routeParams}
        render={props => <Children {...props} {...params} />}
      />
    )
    const RouteWithStateContainer = (props) => (
      <section className="section">
        {showFlashMessage && <FlashMessage flash={state.flash} />}
        <div className="container">
          {!this.state.loading && (
            <RouteWithState {...props} />
          )}
        </div>
      </section>
    )

    return (
      <div className="main-content">
        <Header currentUser={currentUser} pathname={location.pathname} />
        {hideTabBar && (
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
