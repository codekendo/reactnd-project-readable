import React, { Component } from "react"
import "../App.css"
import CommentVoteScore from "./CommentVoteScore.js"
import { showDate } from "../utils/utility.js"
import { connect } from "react-redux"
import { deleteComment } from "../actions"
import { Link } from "react-router-dom"

class CommentTile extends Component {
  handleDelete = e => {
    const { dispatch, comment } = this.props
    e.preventDefault()
    dispatch(deleteComment(comment.id))
  }

  render() {
    const { comment } = this.props
    return (
      <div>
        <div className="commentTileWrapper">
          <article className="media">
            <div className="media-left">
              <figure className="has-text-centered is-64x64">
                <CommentVoteScore score={comment.voteScore} id={comment.id} />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{comment.author}</strong>{" "}
                  <small>{showDate(comment.timestamp)}</small>
                  <br />
                  {comment.body}{" "}
                </p>
                <p>
                  <Link to={`/editcomment/${comment.id}`}>
                    <button
                      className="button is-primary is-small"
                      style={{ marginRight: 10, marginLeft: 15 }}
                    >
                      Edit
                    </button>
                  </Link>
                  &nbsp;
                  <button
                    onClick={this.handleDelete}
                    className="button is-small is-warning"
                  >
                    Delete
                  </button>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }
}

export default connect()(CommentTile)
