import React from "react"
import "../App.css"
import Header from "../containers/HeaderContainer"
import ListPosts from "./ListPosts"
import { withRouter } from "react-router"

class CategoryView extends React.Component {
  render() {
    const categoryName = this.props.match.params.name
    const posts = this.props.posts
    const sortedCategoryPosts = posts
      .filter(post => post.category === categoryName)
      .sort((a, b) => {
        return b.voteScore - a.voteScore
      })
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
          {posts &&
            <ListPosts filteredPosts={sortedCategoryPosts} view="category" />}
        </div>
      </div>
    )
  } //End of Render
} //End of Class

export default withRouter(CategoryView)
