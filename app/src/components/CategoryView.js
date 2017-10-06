import React from "react"
import { connect } from "react-redux"
import { getPostsAction } from "../actions/"
import "../App.css"
import Header from "../containers/HeaderContainer"
import { objectToArray } from "../utils/utility.js"
import ListPosts from "./ListPosts"
import { withRouter } from "react-router"

class CategoryView extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getPostsAction())
  }

  render() {
    const categoryName = this.props.match.params.name
    const posts = this.props.posts
    return (
      <div className="container">
        <div className="section">
          <Header />
          <div className="level">
            <div className="level-left">
              <div className="level-item" style={{ paddingLeft: 50 }}>
                <p className="subtitle is-5">
                  <strong>
                    List of {categoryName} posts
                  </strong>
                </p>
              </div>
            </div>
          </div>
          {posts && <ListPosts filteredPosts={posts} view="category" />}
        </div>
      </div>
    )
  } //End of Render
} //End of Class

const mapStateToProps = ({ posts }, ownProps) => {
  return {
    posts: objectToArray(posts)
      .filter(post => post.category === ownProps.match.params.name)
      .filter(post => post.deleted === false)
      .sort((a, b) => {
        return b.voteScore - a.voteScore
      })
  }
}

export default withRouter(connect(mapStateToProps)(CategoryView))
