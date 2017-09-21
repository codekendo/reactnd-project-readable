import React from "react"
import { connect } from "react-redux"
import { fetchPostsNow } from "../actions/"
import "../App.css"
import VoteScore from "./VoteScore"

class CategoryView extends React.Component {


  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsNow())
  }

  render() {
    const categoryMatch = this.props.match.params.name
    const postState = this.props.posts
    return (
      <div>
        <h2>List of {categoryMatch} posts</h2>
        <ul>
          {postState &&
            postState.filter(post=>post.category === categoryMatch)
              .sort((a, b) => {
                return b.voteScore - a.voteScore
              })
              .map((post, index) => {
                return (
                  <li key={post.id}>
                    <div>
                    <VoteScore score={post.voteScore} id={post.id}/>
                    </div>

                    <a href={"/posts/" + post.id}>
                      {post.title}
                    </a>
                    <p>
                      {post.body}
                    </p>
                  </li>
                )
              })}
        </ul>
      </div>
    )
  } //End of Render
} //End of Class

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(CategoryView)
