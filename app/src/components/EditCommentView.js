import React, { Component } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { getSingleCommmentAction, updateCommentAction } from "../actions"
import serializeForm from "form-serialize"
import Header from "../containers/HeaderContainer"
import { objectToArray } from "../utils/utility"

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
      <div className="container">
        <div className="section">
          {comment &&
            <div>
              <Header />
              <div className="columns">
                <div className="column is-half">
                  <form onSubmit={this.handleSubmit}>
                    <label className="label">
                      Edit UserName:
                      <input
                        className="input"
                        type="text"
                        name="author"
                        defaultValue={comment.author}
                        required
                      />
                    </label>

                    <label className="label">Edit Comment:</label>

                    <textarea
                      className="textarea"
                      src=""
                      cols={20}
                      rows={5}
                      required
                      name="body"
                      defaultValue={comment.body}
                    />
                    <br />
                    <input
                      type="submit"
                      className="button is-success"
                      value="Update Comments"
                    />
                  </form>
                  <br />

                  <button
                    className="button is-primary"
                    onClick={this.handleGoBack}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>}
        </div>
      </div>
    ) //EndofReturn
  } //EndofRender
} //End of EditCommentView

const mapStateToProps = ({ comments }, ownProps) => {
  return {
    myComments: objectToArray(comments),
    comment: objectToArray(comments)[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getCommentsById: () => {
    dispatch(getSingleCommmentAction(ownProps.commentId))
  },
  updateComment: (id, formObject) => {
    dispatch(updateCommentAction(id, formObject))
  }
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditCommentView)
)
