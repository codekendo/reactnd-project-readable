import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchPostsNow, getCommentsById, setCommentFilter, deletePostAction } from "../actions"
import VoteScore from "./VoteScore"
import { showDate } from "../utils/utility"
import { Link } from "react-router-dom"
import CommentTile from "./CommentTile"
import "../App.css"
const filterMyComments = (comments, filter) => {
  switch (filter) {
    case "HIGHEST_SCORE":
      return comments.sort((a, b) => b.voteScore - a.voteScore)
    case "NEWEST":
      return comments.sort((a, b) => b.timestamp - a.timestamp)
    default:
      return comments
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

  handleDeletePost = e =>{
    e.preventDefault();
    const {postId, deletePost} =this.props
    deletePost(postId)
  }

  render() {
    const { posts, postId, comments } = this.props
    console.log(this.props)
    let post

    post = posts.find(singlePosts => {
      return postId === singlePosts.id
    })
    // console.log(showDate(post.timestamp))
    return (
      <div
        style={{
          paddingLeft: 20
        }}
      >
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
          <button onClick={this.handleScore}>Highest Score</button>

          <button onClick={this.handleTime}>Newest</button>

          {comments && <h2>Comments:</h2>}
          {comments &&
            comments.map(comment => {
              return <CommentTile comment={comment} key={comment.id} />
            })}
        </div>
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
  deletePost:(id)=>{
    dispatch(deletePostAction(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
