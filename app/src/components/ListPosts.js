import React, { Component } from "react"
import VoteScore from "./VoteScore"
import { Link } from "react-router-dom"
import "../App.css"
import { showDate } from "../utils/utility.js"
import SortPostComponent from "../containers/SortPostContainer"
import { connect } from "react-redux"
import { deletePostAction } from "../actions"
import CommentNumber from "./CommentNumber"

class ListPosts extends Component {
  handleDeletePost = e => {
    e.preventDefault()
    const id = e.target.id
    const { deletePost } = this.props
    deletePost(id)
  }
  render() {
    const posts = this.props.filteredPosts
    const view = this.props.view
    return (
      <div>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{`${posts.length}`}</strong> posts
              </p>
            </div>
          </div>

          {view === "mainpage" &&
            <div className="level-right">
              <SortPostComponent />
            </div>}
        </div>

        {posts &&
          posts.map((post, index) => {
            return (
              <div key={post.id + index}>
                <hr />
                <div className="container">
                  <article className="media">
                    <div className="media-left">
                      <figure className="has-text-centered is-64x64">
                        <VoteScore score={post.voteScore} id={post.id} />
                      </figure>
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <strong>
                          {" "}<Link to={`/${post.category}/${post.id}`}>
                            {post.title}
                          </Link>
                        </strong>
                        <p>
                          <strong>{post.author}</strong>{" "}
                          <small>{post.category}</small>{" "}
                          <small>{showDate(post.timestamp)}</small>
                          <br />
                          {post.body}{" "}
                        </p>
                        <p>
                          <Link to={`/editpost/${post.id}`}>
                            <button
                              className="button is-primary is-small"
                              style={{ marginRight: 10 }}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={this.handleDeletePost}
                            className="button is-warning is-small"
                            id={post.id}
                            style={{ marginRight: 10 }}
                          >
                            Delete
                          </button>
                          <CommentNumber postId={post.id} />
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  deletePost: id => {
    dispatch(deletePostAction(id))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
