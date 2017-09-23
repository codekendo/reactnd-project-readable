import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchCategoriesNow, fetchPostsNow } from "../actions/"
import { Link } from "react-router-dom"
import "../App.css"
import ListPosts from "../components/ListPosts"
import FilterLinkComponent from './FilterLink'

const getVisiblePosts = (posts, filter) => {
const filteredPosts = posts.filter((post)=> post.deleted===false)
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
    dispatch(fetchCategoriesNow())
    dispatch(fetchPostsNow())
  }

  render() {
    const catState = this.props.categories
    const posts = this.props.posts
    return (
      <div className="app wrapper">
        <div className="flex-parent-center">
          <h1>Readable</h1>
        </div>
        <div className="list-wrapper">
          <h2>Categories</h2>
          <ul className="flex-parent-right-columns pointer">
            {catState &&
              catState.map((cat, index) => {
                return (
                  <li key={cat.name + index}>
                    <Link to={`/categories/${cat.name}`}>
                      {cat.name}
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>

        <div className="list-wrapper">
          <h2>Show</h2>
          <ul className="flex-parent-right-columns show">
            <li>
              <FilterLinkComponent filter="HIGHEST_SCORE">Highest Vote Score</FilterLinkComponent>
              <FilterLinkComponent filter="LOWEST_SCORE">Lowest Vote Score</FilterLinkComponent>
              <FilterLinkComponent filter="NEWEST">Newest</FilterLinkComponent>
              <FilterLinkComponent filter="OLDEST">Oldest</FilterLinkComponent>

            </li>
          </ul>
        </div>

        <div style={{marginLeft:20}} className="newButtonWrapper">

        <Link to="/new">
          <button className="new-post">New Post</button>
        </Link>
</div>
        <div className="post-wrapper">
          <ListPosts posts={posts} />
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
