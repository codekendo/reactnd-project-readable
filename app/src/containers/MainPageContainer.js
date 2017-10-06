import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import "../App.css"
import ListPosts from "../components/ListPosts"
import Header from "../containers/HeaderContainer"

const getVisiblePosts = (posts, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return posts
    case "HIGHEST_SCORE":
      return posts.sort((a, b) => b.voteScore - a.voteScore)
    case "LOWEST_SCORE":
      return posts.sort((a, b) => a.voteScore - b.voteScore)
    case "NEWEST":
      return posts.sort((a, b) => b.timestamp - a.timestamp)
    case "OLDEST":
      return posts.sort((a, b) => a.timestamp - b.timestamp)
    default:
      return posts
  }
}

class MainPage extends Component {

  render() {
    const { categories, posts, postFilter } = this.props

    const visiblePosts = getVisiblePosts( posts, postFilter)

    return (
      <div className="container">
        <div className="section">
          <Header categories={categories} />
          <ListPosts filteredPosts={visiblePosts} view="mainpage" />
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

const mapStateToProps = ({ postFilter }) => ({
  postFilter: postFilter
})

export default connect(mapStateToProps)(MainPage)
