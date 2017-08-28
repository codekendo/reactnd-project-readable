import React, { Component } from "react"
import "./App.css"
import { connect } from "react-redux"
import { fetchCategoriesNow, fetchPostsNow } from "./actions/"
//Default view is Highest VoteScore
// Dynamically Add Categories

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchCategoriesNow());
    dispatch(fetchPostsNow())
    // dispatch(fetchFunction('posts'))
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.categories !== this.props.categories){
  //     const {dispatch} = nextProps
  //     dispatch(fetchCategoriesNow())
  //   }
  // }
  render() {
    console.log("this.props", this.props)
    const catState = this.props.categories
    const postState = this.props.posts
    return (
      <div className="app wrapper">
        <div className="flex-parent-center">
          <h1>Readable</h1>
        </div>
        <div className="list-wrapper">
          <h2>Categories</h2>
          <ul className="flex-parent-right-columns">
            {catState &&
              catState.map((cat, index) => {
                return (
                  <li key={cat.name + index}>
                    {cat.name}
                  </li>
                )
              })}
          </ul>
        </div>

        <div className="list-wrapper">
          <h2>Show</h2>
          <ul className="flex-parent-right-columns show">
            <li> Highest Vote Score</li>
            <li> Lowest Vote Score</li>
            <li>Newest</li>
            <li>Oldest</li>
          </ul>
        </div>

          <div>
            <h3>
              Display number of posts: <span>5</span>, <span>10</span>,{" "}
              <span>15</span>, <span>20</span>
            </h3>
          </div>
          <button className="new-post">New Post</button>

          <div className='post-wrapper'>
          <h2>List of Posts</h2>
          <ul>
            {postState && postState.map((post, index)=>{
              return (
                <li key={post.id}><a href={'/posts/'+post.id}>{post.title}</a>
                <p>{post.body}</p>
                </li>
              )
            })}
          </ul>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}

export default connect(mapStateToProps)(App)
