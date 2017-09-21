import React, { Component } from "react"
import "../App.css"
import CommentVoteScore from "./CommentVoteScore.js"
import { showDate } from "../utils/utility.js"

class CommentTile extends Component {
  render() {
    // {JSON.stringify(comment)}
    const { comment } = this.props
    return (
      <div className="commentTileWrapper">
        <div>
          <CommentVoteScore score={comment.voteScore} id={comment.id} />
          <b>
            {comment.author}
          </b>
          {showDate(comment.timestamp)}
        </div>

        <div>
          {comment.body}
        </div>
      </div>
    )
  }
}

export default CommentTile
