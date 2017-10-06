import React, { Component } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { getPostsAction, getCategoriesAction, editPostAction } from "../actions"
import serializeForm from "form-serialize"
import Header from "../containers/HeaderContainer"
import { objectToArray } from "../utils/utility"

class EditPostView extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategoriesAction())
    dispatch(getPostsAction())
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
    const { categories, post } = this.props
    return (
      <div className="container">
        <Header />
        {post &&
          <div className="columns">
            <div className="column is-half">
              <h2 className="title is-5">
                Edit this post: {post.title}
              </h2>

              <form onSubmit={this.handleSubmit}>
                <label className="label">
                  Post Title:
                  <br />
                  <input
                    className="input"
                    type="text"
                    name="title"
                    defaultValue={post.title}
                    required
                  />
                </label>
                <br />

                <label className="label">
                  Username:
                  <br />
                  <input
                    className="input"
                    type="text"
                    name="author"
                    defaultValue={post.author}
                    required
                  />
                </label>
                <br />

                <label className="label">
                  Category:
                  <br />
                  <div className="select">
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
                  </div>
                </label>
                <br />

                <label className="label">
                  Message:
                  <br />
                  <textarea
                    className="textarea"
                    name="body"
                    defaultValue={post.body}
                    required
                    cols={45}
                    rows={10}
                  />
                </label>

                <br />
                <input
                  className="button is-success"
                  type="submit"
                  value="submit"
                  style={{ marginBottom: 15 }}
                />
              </form>

              <button onClick={this.handleGoBack} className="button is-primary">
                {" "}Go Back
              </button>
            </div>
          </div>}
      </div>
    ) //EndofReturn
  } //EndofRender
} //End of Edit Post View

const mapStateToProps = ({ categories, posts }, ownProps) => ({
  categories,
  posts: objectToArray(posts),
  post: objectToArray(posts).find(post => post.id === ownProps.postId)
})

export default withRouter(connect(mapStateToProps)(EditPostView))
