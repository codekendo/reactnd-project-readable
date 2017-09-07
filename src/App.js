import React, { Component } from "react"
import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import MainPage from "./components/MainPage"
import CategoryView from "./components/CategoryView"
import AddNewPosts from "./components/AddNewPosts"
//Default view is Highest VoteScore
// Dynamically Add Categories

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <MainPage />} />

        <Route exact path="/categories/:name" component={CategoryView} />

         <Route exact path="/new" render={({history}) => <AddNewPosts />} />
      </div>
    )
  }
}

export default withRouter(App)
