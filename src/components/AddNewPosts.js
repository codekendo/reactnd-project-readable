import React from "react"
import { connect } from "react-redux"
import { fetchCategoriesNow, sendPostsNow } from "../actions/"
import "../App.css"
import faker from "faker"
import {withRouter} from 'react-router'


class AddNewPosts extends React.Component {
  state = {
    id: faker.random.uuid(),
    timestamp: Date.now(),
    title: "",
    body: "",
    owner: "",
    category: "",
    voteScore: 1,
    deleted: false
  }

  handleChange = event => {
    const attributeName = event.target.getAttribute("name")
    this.setState({ [attributeName]: event.target.value })
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategoriesNow())
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, history } = this.props

    this.setState({timestamp:Date.now()})
    if(this.state.title !== '' && this.state.body !=='' && this.state.owner !== '' && this.state.category !=='' ){
      dispatch(sendPostsNow(this.state))
    }
    // history.push('/')
  }
  render() {
    const categoryState = this.props.categories
    return (
      <div>
      {JSON.stringify(this.state)}
        <h2>Add New Posts</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            New Post Title
            <br />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Username
            <br />
            <input
              type="text"
              name="owner"
              placeholder="Your Username"
              value={this.state.owner}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Category
            <br />
            <select name="category" onChange={this.handleChange}>
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
            <textarea name="body" onChange={this.handleChange} />
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
