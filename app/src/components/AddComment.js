import React, { Component } from "react"
import { connect } from "react-redux"
import {addComment} from "../actions"
import serializeForm from "form-serialize"
import faker from "faker"


class AddComment extends Component {
  componentDidMount() {}
  handleSubmit = e => {
    const {postId} =this.props
    e.preventDefault()
    const {dispatch} = this.props
    const formObject = serializeForm(e.target, {hash:true})
    const modifiedFormObject = {
      ...formObject,
      id:faker.random.uuid(),
      parentId:postId,
      timestamp:Date.now(),
      voteScore:1,
      deleted:false,
      parentDeleted:false
    }
    dispatch(addComment(modifiedFormObject))
  }

  render() {
     console.log(this.props)
    return (
      <div className="commentTileWrapper">
        <h3>Add a comment:</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            required
            name="author"
            placeholder="Your username"
          />
          <br />
          <br />
          <textarea
            type="text"
            required
            name="body"
            cols={50}
            rows={15}
            placeholder="Add a comment"
          />
          <br />
          <br />

          <input type="submit" value="Post Comment" />
          <br />
        </form>
      </div>
    )
  } //EndofRender
} //End of Edit Post View

const mapStateToProps = (state, ownProps) => {
  return state
}

export default connect(mapStateToProps)(AddComment)
