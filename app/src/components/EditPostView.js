import React, { Component } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import {
  fetchPostsNow,
  getCategoriesAction,
  editPostAction
} from "../actions"
import serializeForm from "form-serialize"

class EditPostView extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategoriesAction())
    dispatch(fetchPostsNow())
  }
  handleSubmit = e => {
    e.preventDefault()
    const { dispatch, history } = this.props
    const post = this.props.post
    const formObject = serializeForm(e.target, { hash: true })
    const modifiedFormObject = {
      ...formObject,
      id: post.id,
      timestamp: post.timestamp,
      voteScore: post.voteScore,
      deleted: false
    }
    dispatch(editPostAction(modifiedFormObject, post.id)).then(history.goBack())
  }

  handleGoBack = e => {
    const { history } = this.props
    e.preventDefault()
    history.goBack()
  }

  render() {
    const post = this.props.post
    const { categories } = this.props

    return (
      <div>






        {post &&
          <div>
            <h2>
              Edit this post: {post.title}
            </h2>

            <form onSubmit={this.handleSubmit}>
              <label>
                Post Title:
                <br />
                <input
                  type="text"
                  name="title"
                  defaultValue={post.title}
                  required
                />
              </label>
              <br />

              <label>
                Username:
                <br />
                <input
                  type="text"
                  name="author"
                  defaultValue={post.author}
                  required
                />
              </label>
              <br />

              <label>
                Category:
                <br />
                <select defaultValue={post.category} name="category">
                  {categories &&
                    categories.map((category, index) => {
                      return (
                        <option key={category.name + index}>
                          {category.name}
                        </option>
                      )
                    })}
                </select>
              </label>
              <br />

              <label>
                Message:
                <br />
                <textarea
                  name="body"
                  defaultValue={post.body}
                  required
                  cols={45}
                  rows={10}
                />
              </label>

              <br />
              <input type="submit" value="submit" />
            </form>

            <button onClick={this.handleGoBack}> Go Back</button>
          </div>}
      </div>
    ) //EndofReturn
  } //EndofRender
} //End of Edit Post View

const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
    posts: state.posts,
    post: state.posts.find(post => post.id === ownProps.match.params.id)
  }
}

export default withRouter(connect(mapStateToProps)(EditPostView))
