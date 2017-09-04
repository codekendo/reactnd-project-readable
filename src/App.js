import React, { Component } from "react"
import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import MainPage from "./components/MainPage"
import CategoryView from "./components/CategoryView"
//Default view is Highest VoteScore
// Dynamically Add Categories

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <MainPage />} />

        <Route exact path="/categories/:name" component={CategoryView} />
      </div>
    )
  }
}

export default withRouter(App)
