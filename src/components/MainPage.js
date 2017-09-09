import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchCategoriesNow, fetchPostsNow } from "../actions/"
import { Link } from "react-router-dom"
import "../App.css"
import VoteScore from "./VoteScore"

class MainPage extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategoriesNow())
    dispatch(fetchPostsNow()).then(() => {
      this.setState({
        posts: this.props.posts
      })
    })

    this.state.posts &&
      this.setState(prevState => {
        return prevState.posts.sort((a, b) => {
          return b.voteScore - a.voteScore
        })
      })
  }
  componentWillReceiveProps() {
    const { posts } = this.props
    this.setState({
      posts: posts
    })
  }
  handleClickHighestOrderFirst = e => {
    this.setState(prevState => {
      return prevState.posts.sort((a, b) => {
        return b.voteScore - a.voteScore
      })
    })
  }

  handleClickLowestOrderFirst = e => {
    this.setState(prevState => {
      return prevState.posts.sort((a, b) => {
        return a.voteScore - b.voteScore
      })
    })
  }

  handleClickNewestOrderFirst = e => {
    this.setState(prevState => {
      return prevState.posts.sort((a, b) => {
        return b.timestamp - a.timestamp
      })
    })
  }

  handleClickOldestOrderFirst = e => {
    this.setState(prevState => {
      return prevState.posts.sort((a, b) => {
        return a.timestamp - b.timestamp
      })
    })
  }

  render() {
    console.log(this.props)
    const catState = this.props.categories
    const postState = this.state.posts
    return (
      <div className="app wrapper">
        {JSON.stringify(this.props)}
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
            <li onClick={this.handleClickHighestOrderFirst}>
              Highest Vote Score
            </li>
            <li onClick={this.handleClickLowestOrderFirst}>
              {" "}Lowest Vote Score
            </li>
            <li onClick={this.handleClickNewestOrderFirst}>Newest</li>
            <li onClick={this.handleClickOldestOrderFirst}>Oldest</li>
          </ul>
        </div>

        <div>
          <h3>
            Display number of posts: <span>5</span>, <span>10</span>,{" "}
            <span>15</span>, <span>20</span>
          </h3>
        </div>
        <Link to="/new">
          <button className="new-post">New Post</button>
        </Link>

        <div className="post-wrapper">
          <h2>List of Posts</h2>
          <ul>
            {postState &&
              postState.map((post, index) => {
                return (
                  <li key={post.id}>
                    <VoteScore score={post.voteScore} />

                    <Link to={"/post/" + post.id}>
                      {post.title}
                    </Link>
                    <p>
                      {post.body}
                    </p>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

export default connect(mapStateToProps)(MainPage)
