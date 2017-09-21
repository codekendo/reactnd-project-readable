import React, { Component } from "react"
import VoteScore from "./VoteScore"
import { Link } from "react-router-dom"
import "../App.css"

class ListPosts extends Component {
  render() {
    const { posts } = this.props
    return (
      <div>
        {posts &&
          posts.map((post, index) => {
            return (
              <div key={post.id + index}>
                <div className="flex-wrapper">
                  <div>
                    <VoteScore score={post.voteScore} id={post.id} />
                  </div>
                  <div>
                    <Link to={"/post/" + post.id}>
                      {post.title}
                    </Link>
                  </div>
                </div>
                <p style={{ paddingLeft: 60 }}>
                  {post.body}
                </p>
              </div>
            )
          })}
      </div>
    )
  }
}

export default ListPosts
