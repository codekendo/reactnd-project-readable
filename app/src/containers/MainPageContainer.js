import React, { Component } from "react"
import { connect } from "react-redux"
import { getCategoriesAction, getPostsAction } from "../actions/"
import { Link } from "react-router-dom"
import "../App.css"
import ListPosts from "../components/ListPosts"
import Header from "../containers/HeaderContainer"
import { objectToArray } from "../utils/utility"

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
    dispatch(getPostsAction())
  }

  render() {
    const catState = this.props.categories
    const posts = this.props.posts
    return (
      <div className="container">
        <div className="section">
          <Header categories={catState} />

          <ListPosts filteredPosts={posts} view="mainpage" />
        </div>

        <div className="newButtonWrapper">
          <Link to="/new">
            <button className="button is-info" style={{ marginLeft: 30 }}>
              New Post
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts, postFilter }) => {
  return {
    categories: categories,
    posts: getVisiblePosts(objectToArray(posts), postFilter),
    postFilter: postFilter
  }
}

export default connect(mapStateToProps)(MainPage)
