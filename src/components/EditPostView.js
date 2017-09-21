import React, {Component} from "react"
import {withRouter} from "react-router"
import {connect} from "react-redux"
// import {fetchPostsNow} from "../actions/"

class EditPostView extends Component {
  componentDidMount() {
    // const {dispatch} = this.props
    // dispatch(fetchPostsNow())
  }

  render() {
    console.log(this.props)
    // console.log('post', this.props.posts)
    // const { post } = this.props
    // console.log(this.props)
    // const {postId, posts}
    // let post
    // post = posts.find(singlePosts => {
    //   return postId === singlePosts.id
    // })
    //

    return (
      <div>
        hello
      </div>
    )
  }
}
//End of Edit Post View

const mapStateToProps = state => {
  return ({posts:state.posts})
}

export default withRouter(connect(mapStateToProps)(EditPostView))
