import React, { Component } from "react"
import VoteScore from "./VoteScore"
import { Link } from "react-router-dom"
import "../App.css"
import { showDate } from "../utils/utility.js"
import SortPostComponent from "../containers/SortPostContainer"

class ListPosts extends Component {
  render() {
    const { posts } = this.props
    return (
      <div>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{`${posts.length}`}</strong> posts
              </p>
            </div>
          </div>

          <div className="level-right">
            <SortPostComponent />
          </div>
        </div>

        {posts &&
          posts.map((post, index) => {
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
                          {" "}<Link to={"/post/" + post.id}>{post.title}</Link>
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
    )
  }
}

export default ListPosts
