import React, { Component } from "react"
import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import MainPageContainer from "./containers/MainPageContainer"
import CategoryView from "./components/CategoryView"
import AddNewPosts from "./components/AddNewPosts"
import PostDetailView from "./components/PostDetailView"
import EditPostView from "./components/EditPostView"

//Default view is Highest VoteScore
// Dynamically Add Categories

class App extends Component {
  render() {

    const { history } = this.props

    return (
      <div>
        <Route exact path="/" render={() => <MainPageContainer />} />

        <Route exact path="/categories/:name" component={CategoryView} />

        <Route exact path="/new" render={({ history }) => <AddNewPosts />} />

        <Route
          exact
          path="/post/:id"
          render={({ match }) => <PostDetailView postId={match.params.id} />}
        />

        <Route
          exact
          path="/edit/:id"
          render={({ match, history }) =>
            <EditPostView postId={match.params.id} history={history} />}
        />
      </div>
    )
  }
}

export default withRouter(App)
