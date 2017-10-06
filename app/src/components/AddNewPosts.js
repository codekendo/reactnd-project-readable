import React from "react"
import { connect } from "react-redux"
import { getCategoriesAction, addNewPostAction } from "../actions/"
import "../App.css"
import faker from "faker"
import { withRouter } from "react-router"
import serializeForm from "form-serialize"
import Header from "../containers/HeaderContainer"

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
      dispatch(addNewPostAction(modifiedFormObject))
      history.push("/")
    }
  }
  render() {
    const categories = this.props.categories
    return (
      <div className="section">
        <Header />
        <br />
        <div className="columns" style={{ marginLeft: 38 }}>
          <div className="column is-half">
            <h2 className="title is-5">Add New Posts</h2>
            <form onSubmit={this.handleSubmit}>
              <label className="label">
                New Post Title
                <br />
                <input
                  type="text"
                  className="input"
                  name="title"
                  placeholder="Title"
                  required
                />
              </label>
              <br />
              <label className="label">
                Username
                <br />
                <input
                  type="text"
                  className="input"
                  name="author"
                  placeholder="Your Username"
                  required
                />
              </label>
              <br />
              <label className="label">
                Category
                <br />
                <div className="select">
                  <select name="category" required>
                    <option value="0">Select Category</option>
                    {categories &&
                      categories.map((cat, index) => {
                        return (
                          <option key={cat.name + index}>
                            {cat.name}
                          </option>
                        )
                      })}
                  </select>
                </div>
              </label>
              <br />
              <label className="label">
                Message
                <br />
                <textarea name="body" required className="textarea" />
              </label>
              <br />
              <button className="button is-success">Add New Post</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(AddNewPosts))
