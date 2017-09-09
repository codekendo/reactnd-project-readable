import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchPostsNow } from "../actions"
import VoteScore from "./VoteScore"
import {showDate} from '../utils/utility'
class PostDetailView extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsNow())
  }
  render() {
    const { posts, postId } = this.props

    let post

    post = posts.find(singlePosts => {
      return postId === singlePosts.id
    })
    // console.log(showDate(post.timestamp))

    return (
      <div>
        {post &&
          <div>
          <VoteScore  score={post.voteScore}/>
            <h2>
              Title: {post.title}
            </h2>
            <h3>
              Author: {post.author}
            </h3>
            <h4>
            Body: {post.body}
            </h4>
            <h5>
            Created: {showDate(post.timestamp)}
            </h5>
            <h5>
            Category: {post.category}
            </h5>
          </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(PostDetailView)
