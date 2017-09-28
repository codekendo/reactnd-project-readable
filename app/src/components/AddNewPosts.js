import React from "react"
import { connect } from "react-redux"
import { getCategoriesAction, sendPostsNow } from "../actions/"
import "../App.css"
import faker from "faker"
import { withRouter } from "react-router"
import serializeForm from "form-serialize"

class AddNewPosts extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCategoriesAction())
  }

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch, history } = this.props

    const formObject = serializeForm(e.target, { hash: true })
    const modifiedFormObject = {
      ...formObject,
      id: faker.random.uuid(),
      timestamp: Date.now(),
      voteScore: 1,
      deleted: false
    }

    if (modifiedFormObject.categories === 0) {
      alert("please fill out categories")
    } else {
      dispatch(sendPostsNow(modifiedFormObject))
      history.push("/")
    }
  }
  render() {
    const categoryState = this.props.categories
    return (
      <div>
        {JSON.stringify(this.props)}
        <h2>Add New Posts</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            New Post Title
            <br />
            <input type="text" name="title" placeholder="Title" required />
          </label>
          <br />
          <label>
            Username
            <br />
            <input
              type="text"
              name="author"
              placeholder="Your Username"
              required
            />
          </label>
          <br />
          <label>
            Category
            <br />
            <select name="category" required>
              <option value="0">Select Category</option>
              {categoryState &&
                categoryState.map((cat, index) => {
                  return (
                    <option key={cat.name + index}>
                      {cat.name}
                    </option>
                  )
                })}
            </select>
          </label>
          <br />
          <label>
            Message
            <br />
            <textarea name="body" required />
          </label>
          <br />
          <button>Add New Post</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
export default withRouter(connect(mapStateToProps)(AddNewPosts))
