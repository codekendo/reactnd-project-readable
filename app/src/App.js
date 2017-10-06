import React, { Component } from "react"
import { withRouter } from "react-router"
import { Route, Switch } from "react-router-dom"
import MainPageContainer from "./containers/MainPageContainer"
import CategoryView from "./components/CategoryView"
import AddNewPosts from "./components/AddNewPosts"
import PostDetailView from "./components/PostDetailView"
import EditPostView from "./components/EditPostView"
import EditCommentView from "./components/EditCommentView"

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <MainPageContainer />} />
          <Route
            path="/editcomment/:commentId"
            render={({ match }) =>
              <EditCommentView commentId={match.params.commentId} />}
          />
          <Route
            path="/editpost/:query"
            render={({ match }) => <EditPostView postId={match.params.query} />}
          />
          <Route
            path="/:category/:postid"
            render={({ match }) =>
              <PostDetailView postId={match.params.postid} />}
          />
          <Route exact path="/new" render={({ history }) => <AddNewPosts />} />
          <Route path="/:name" render={() => <CategoryView />} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
