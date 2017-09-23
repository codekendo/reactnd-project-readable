import React, { Component } from "react"
import "../App.css"
import { upVoteThisPost, downVoteThisPost } from "../actions"
import { connect } from "react-redux"
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'

class VoteScore extends Component {
  handleUpVote = e => {
    e.preventDefault()
    const { dispatch, id} = this.props
    dispatch(upVoteThisPost(id))
  }
  handleDownVote = e => {
    e.preventDefault()
    const { dispatch, id} = this.props
    dispatch(downVoteThisPost(id))
  }

  render() {
    const { score } = this.props
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

export default connect()(VoteScore)
