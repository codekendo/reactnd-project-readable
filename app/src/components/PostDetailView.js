import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchPostsNow,
  getCommentsById,
  setCommentFilter,
  deletePostAction
} from "../actions"
import VoteScore from "./VoteScore"
import { showDate } from "../utils/utility"
import { Link } from "react-router-dom"
import CommentTile from "./CommentTile"
import "../App.css"
import AddComment from "./AddComment"
import Header from "../containers/HeaderContainer"
import { withRouter } from "react-router"

const filterMyComments = (comments, filter) => {
  const filteredComments = comments.filter(comment => comment.deleted === false)
  switch (filter) {
    case "HIGHEST_SCORE":
      return filteredComments.sort((a, b) => b.voteScore - a.voteScore)
    case "NEWEST":
      return filteredComments.sort((a, b) => b.timestamp - a.timestamp)
    default:
      return filteredComments
  }
}

class PostDetailView extends Component {
  componentWillMount() {
    const { getCommentsById, fetchPostsNow, getCommentFilter } = this.props
    fetchPostsNow()
    getCommentsById()
    getCommentFilter()
  }

  handleScore = e => {
    e.preventDefault()
    this.props.getCommentFilter("HIGHEST_SCORE")
  }

  handleTime = e => {
    e.preventDefault()
    this.props.getCommentFilter("NEWEST")
  }

  handleDeletePost = e => {
    e.preventDefault()
    const { postId, deletePost, history } = this.props
    deletePost(postId)
    history.push("/")
  }

  render() {
    const { posts, postId, comments } = this.props
    // console.log(this.props)
    let post

    post = posts.find(singlePosts => {
      return postId === singlePosts.id
    })
    return (
      <div className="container">
        {post &&
          !post.deleted &&
          <div className="section">
            <Header />

            {post &&
              <div>
                <div
                  className="post-detail-header-wrapper title is-5"
                  style={{ marginBottom: 5 }}
                >
                  <div>
                    <VoteScore score={post.voteScore} id={post.id} />
                  </div>
                  <div>
                    <strong>
                      {post.title}
                    </strong>
                  </div>
                </div>

                <main className="content" style={{ marginLeft: 50 }}>
                  <blockquote>
                    {post.body}
                  </blockquote>
                  <div>
                    Author: {post.author}
                  </div>
                  <div>
                    Created: {showDate(post.timestamp)}
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    Category: {post.category}
                  </div>

                  <Link to={`/edit/${post.id}`}>
                    <button
                      className="button is-primary is-small"
                      style={{ marginRight: 10 }}
                    >
                      Edit
                    </button>
                  </Link>

                  <button
                    className="button is-warning is-small"
                    onClick={this.handleDeletePost}
                  >
                    Delete
                  </button>
                </main>
              </div>}

            <div className="section content">
              {comments &&
                <div>
                  <div className="level">
                    <div className="level-left">
                      <h2 className="subtitle is-5">Comments:</h2>
                    </div>
                    <div className="level-right">
                      <button
                        onClick={this.handleScore}
                        className="button is-info is-small"
                        style={{ marginRight: 15 }}
                      >
                        Highest Score
                      </button>
                      <button
                        onClick={this.handleTime}
                        className="button is-info is-small"
                      >
                        Newest
                      </button>
                    </div>
                  </div>

                  <div>
                    {comments.map(comment => {
                      return <CommentTile comment={comment} key={comment.id} />
                    })}
                  </div>
                  <div>
                    <AddComment postId={this.props.postId} />
                  </div>
                </div>}
            </div>
          </div>}

        {post && post.deleted && <div>Post not found</div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: filterMyComments(state.comments, state.commentFilter),
    commentFilter: state.commentFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommentsById: () => {
    dispatch(getCommentsById(ownProps.postId))
  },
  fetchPostsNow: () => {
    dispatch(fetchPostsNow())
  },
  getCommentFilter: (filter = "HIGHEST_SCORE") => {
    dispatch(setCommentFilter(filter))
  },
  deletePost: id => {
    dispatch(deletePostAction(id))
  }
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
)
