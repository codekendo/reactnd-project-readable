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
            <div>
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <p className="subtitle is-5">
                      <strong> posts</strong>
                    </p>
                  </div>
                </div>

                <div className="level-right">

                </div>
              </div>
              </div>
            {post &&
              <div>
                <header className="post-detail-header-wrapper">
                  <div>
                    <VoteScore score={post.voteScore} id={post.id} />
                  </div>
                  <div>
                    <h2>
                      {post.title}
                    </h2>
                  </div>
                </header>
                <main className="post-view-subsection">
                  <h3>
                    Body: {post.body}
                  </h3>
                  <h4>
                    Author: {post.author}
                  </h4>
                  <h4>
                    Created: {showDate(post.timestamp)}
                  </h4>
                  <h4>
                    Category: {post.category}
                  </h4>
                  <Link to={`/edit/${post.id}`}>
                    <button>Edit</button>
                  </Link>

                  <button onClick={this.handleDeletePost}>Delete</button>
                </main>
              </div>}

            <div className="comment-section">
              {comments &&
                <div>
                  <h2>Comments:</h2>
                  <div className="commentButtonWrapper">
                    <button onClick={this.handleScore}>Highest Score</button>
                    <button onClick={this.handleTime}>Newest</button>
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
