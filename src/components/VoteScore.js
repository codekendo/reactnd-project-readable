import React, { Component } from "react"
import "../App.css"


class VoteScore extends Component {

render(){
  const voteScore = this.props.score
  return (
    <div className="voteScore-wrapper">
      {voteScore}
      <div>
        <span>&uarr;</span>
        <span>&darr;</span>
      </div>
    </div>
  )
}





}

export default VoteScore
