import React, { Component } from "react"
import { withRouter } from "react-router"
import { connect } from "react-redux"
import { fetchPostsNow, getCategoriesAction, editPostAction } from "../actions"
import serializeForm from "form-serialize"
import Header from "../containers/HeaderContainer"

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
      <div className="container">
        <Header />

        {post &&
          <div classNme="columns">
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

const mapStateToProps = ({ categories, posts }, ownProps) => {
  return {
    categories,
    posts,
    post: posts.find(post => post.id === ownProps.match.params.id)
  }
}

export default withRouter(connect(mapStateToProps)(EditPostView))
