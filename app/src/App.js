import React, { Component } from "react"
import { withRouter } from "react-router"
import { Route, Switch } from "react-router-dom"
import MainPageContainer from "./containers/MainPageContainer"
import CategoryView from "./components/CategoryView"
import AddNewPosts from "./components/AddNewPosts"
import PostDetailView from "./components/PostDetailView"
import EditPostView from "./components/EditPostView"
import EditCommentView from "./components/EditCommentView"
import { connect } from "react-redux"
import { objectToArray } from "./utils/utility"
import { getCategoriesAction, getPostsAction } from "./actions/"

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategoriesAction())
    dispatch(getPostsAction())
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              <MainPageContainer categories={categories} posts={posts} />}
          />
          <Route
            path="/editcomment/:commentId"
            render={({ match }) =>
              <EditCommentView commentId={match.params.commentId} />}
          />
          <Route
            path="/editpost/:query"
            render={({ match }) =>
              <EditPostView
                postId={match.params.query}
                posts={posts}
                categories={categories}
              />}
          />
          <Route
            path="/:category/:postid"
            render={({ match }) =>
              <PostDetailView postId={match.params.postid} posts={posts} />}
          />
          <Route
            exact
            path="/new"
            render={({ history }) => <AddNewPosts categories={categories} />}
          />
          <Route path="/:name" render={() => <CategoryView posts={posts} />} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, categories }) => ({
  categories,
  posts: objectToArray(posts).filter(post => post.deleted === false)
})
export default withRouter(connect(mapStateToProps)(App))
