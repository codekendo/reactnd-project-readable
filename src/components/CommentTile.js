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
      <div className="commentTileWrapper">
        <div>
          <CommentVoteScore score={comment.voteScore} id={comment.id} />
          <b>
            {comment.author} &nbsp;
          </b>
          {showDate(comment.timestamp)}
        </div>
        <div>
          {comment.body}
        </div>
        <br />
        <div>
          <Link to={`/editcomment/${comment.id}`}>
            {" "}<button>Edit</button>
          </Link>
          &nbsp;
          <button onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    )
  }
}

export default connect()(CommentTile)
