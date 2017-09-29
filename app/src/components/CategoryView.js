import React from "react"
import { connect } from "react-redux"
import { fetchPostsNow } from "../actions/"
import "../App.css"
import VoteScore from "./VoteScore"
import Header from "../containers/HeaderContainer"
import { Link } from "react-router-dom"
import { showDate } from "../utils/utility.js"

class CategoryView extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsNow())
  }

  render() {
    const categoryMatch = this.props.match.params.name
    const posts = this.props.posts
    return (
      <div class="container">
        <div className="section">
        <Header />

            <div className="level">
              <div className="level-left">
                <div className="level-item" style={{paddingLeft:50}}>
                  <p className="subtitle is-5">
                    <strong>
                      List of {categoryMatch} posts
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            {posts &&
              posts
                .filter(post => post.category === categoryMatch)
                .sort((a, b) => {
                  return b.voteScore - a.voteScore
                })
                .map((post, index) => {
                  return (
                    <div key={post.id + index}>
                      <hr />
                      <div className="container">
                        <article className="media">
                          <div className="media-left">
                            <figure className="has-text-centered is-64x64">
                              <VoteScore score={post.voteScore} id={post.id} />
                            </figure>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <strong>
                                {" "}<Link to={"/post/" + post.id}>
                                  {post.title}
                                </Link>
                              </strong>

                              <p>
                                <strong>{post.author}</strong>{" "}
                                <small>{post.category}</small>{" "}
                                <small>{showDate(post.timestamp)}</small>
                                <br />
                                {post.body}{" "}
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  )
                })}
          </div>
      </div>
    )
  } //End of Render
} //End of Class

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts
  }
}

export default connect(mapStateToProps)(CategoryView)
