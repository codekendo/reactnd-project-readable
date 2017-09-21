import React, { Component } from "react"
import "../App.css"
import { upVoteThisComment, downVoteThisComment } from "../actions"
import { connect } from "react-redux"
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

class CommentVoteScore extends Component {
  handleUpVote = e => {
    e.preventDefault()
    const { dispatch, id} = this.props
    dispatch(upVoteThisComment(id))
  }
  handleDownVote = e => {
    e.preventDefault()
    const { dispatch, id} = this.props
    dispatch(downVoteThisComment(id))
  }

  render() {
    const { score} = this.props

    return (
      <div className="voteScore-wrapper">
        <span style={{ paddingLeft: 9 }}>
          {score}
        </span>
        <div>
          <span onClick={this.handleUpVote}><FaThumbsOUp size={15}/></span>
          <span onClick={this.handleDownVote}><FaThumbsODown size = {15}/></span>
        </div>
      </div>
    )
  }
}

export default connect()(CommentVoteScore)
