import React, { Component } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { getCommentsById, updateCommentAction } from "../actions"
import serializeForm from "form-serialize"

class EditCommentView extends Component {
  componentDidMount() {
    const { getCommentsById } = this.props
    getCommentsById()
  }

  handleSubmit = e => {
    e.preventDefault()
    const { history, comment, updateComment } = this.props
    const formObject = serializeForm(e.target, { hash: true })
    updateComment(comment.id, formObject)
    history.goBack()
  }

  handleGoBack = e => {
    const { history } = this.props
    e.preventDefault()
    history.goBack()
  }

  render() {
    console.log(this.props)

    const { comment } = this.props
    return (
      <div>
        {comment &&
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Edit UserName:
                <br />
                <br />
                <input
                  type="text"
                  name="author"
                  defaultValue={comment.author}
                  required
                />
              </label>
              <br />
              <br />

              <label>
                Edit Comment:
                <br />
                <br />
              </label>

              <textarea
                src=""
                cols={20}
                rows={5}
                required
                name="body"
                defaultValue={comment.body}
              />
              <br />
              <br />
              <input type="submit" value="Update Comments" />
            </form>
            <br />
            <button onClick={this.handleGoBack}>Go Back</button>
          </div>}
      </div>
    ) //EndofReturn
  } //EndofRender
} //End of EditCommentView

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    comments: state.comments,
    comment: state.comments.find(
      comment => comment.parentId === ownProps.commentId
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommentsById: () => {
    dispatch(getCommentsById(ownProps.commentId))
  },
  updateComment: (id, formObject) => {
    dispatch(updateCommentAction(id, formObject))
  }
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditCommentView)
)
