import React, { Component } from "react"
import "../App.css"
import { upVoteThisPost, downVoteThisPost } from "../actions"
import { connect } from "react-redux"
import FaThumbsOUp from "react-icons/lib/fa/thumbs-o-up"
import FaThumbsODown from "react-icons/lib/fa/thumbs-o-down"

class VoteScore extends Component {
  handleUpVote = e => {
    e.preventDefault()
    const { dispatch, id } = this.props
    dispatch(upVoteThisPost(id))
  }
  handleDownVote = e => {
    e.preventDefault()
    const { dispatch, id } = this.props
    dispatch(downVoteThisPost(id))
  }

  render() {
    const { score } = this.props
    return (
      <div style={{width:100}}>
        <div class="columns" stlye="">
          <div class="column button is-success has-text-centered">
            {score}
          </div>
        </div>

        <div class="columns">
          <div class="column button is-info has-text-centered">
            <span onClick={this.handleUpVote}>
              <FaThumbsOUp size={15} />
            </span>{" "}
          </div>
          <div class="column button is-primary has-text-centered">
            <span onClick={this.handleDownVote}>
              <FaThumbsODown size={15} />
            </span>{" "}
          </div>
        </div>
      </div>



    )
  }
}

export default connect()(VoteScore)
