import React, { Component } from "react"
import { connect } from "react-redux"
import { getCategoriesAction, fetchPostsNow } from "../actions/"
import { Link } from "react-router-dom"
import "../App.css"
import ListPosts from "../components/ListPosts"
import Header from "../containers/HeaderContainer"

const getVisiblePosts = (posts, filter) => {
  const filteredPosts = posts.filter(post => post.deleted === false)
  switch (filter) {
    case "SHOW_ALL":
      return filteredPosts
    case "HIGHEST_SCORE":
      return filteredPosts.sort((a, b) => b.voteScore - a.voteScore)
    case "LOWEST_SCORE":
      return filteredPosts.sort((a, b) => a.voteScore - b.voteScore)
    case "NEWEST":
      return filteredPosts.sort((a, b) => b.timestamp - a.timestamp)
    case "OLDEST":
      return filteredPosts.sort((a, b) => a.timestamp - b.timestamp)
    default:
      return filteredPosts
  }
}

class MainPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategoriesAction())
    dispatch(fetchPostsNow())
  }

  render() {
    const catState = this.props.categories
    const posts = this.props.posts
    return (
      <div className="app container">
        <div className="section">
          <Header categories={catState} />

          <ListPosts posts={posts} />
        </div>

        <div className="newButtonWrapper">
          <Link to="/new">
            <button className="button is-info">New Post</button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: getVisiblePosts(state.posts, state.postFilter),
    postFilter: state.postFilter
  }
}

export default connect(mapStateToProps)(MainPage)
