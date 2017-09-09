import React, { Component } from "react"
import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import MainPage from "./components/MainPage"
import CategoryView from "./components/CategoryView"
import AddNewPosts from "./components/AddNewPosts"
import PostDetailView from "./components/PostDetailView"

//Default view is Highest VoteScore
// Dynamically Add Categories

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <MainPage />} />

        <Route exact path="/categories/:name" component={CategoryView} />

        <Route exact path="/new" render={({ history }) => <AddNewPosts />} />

        <Route
          exact
          path="/post/:id"
          render={({ match }) =>
            <PostDetailView postId={match.params.id} />
          }
        />
      </div>
    )
  }
}

export default withRouter(App)
