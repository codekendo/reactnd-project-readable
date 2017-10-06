import React, { Component } from "react"
import { connect } from "react-redux"
import { getCommentsById } from "../actions"
import { objectToArray } from "../utils/utility"

const filteredComments = (comments, id) => {
  const filterDeleted = comments.filter(comment => comment.deleted === false)
  const filterId = filterDeleted.filter(comment => comment.parentId === id)
  return filterId
}

class CommentNumber extends Component {
  componentWillMount() {
    const { getCommentsById } = this.props
    getCommentsById()
  }
  render() {
    const { comments } = this.props
    return (
      comments &&
      <strong>
        {comments.length + "   "}
        Comments
      </strong>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommentsById: id => dispatch(getCommentsById(ownProps.postId))
})

const mapStateToProps = (state, ownProps) => ({
  comments: filteredComments(objectToArray(state.comments), ownProps.postId)
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentNumber)
