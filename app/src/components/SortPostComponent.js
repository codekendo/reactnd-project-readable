import React, { Component } from "react"

class SortPostComponent extends Component {
  handleOnChange = e => {
    e.preventDefault()
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div className="select is-pulled-right level-item	">
        <select onChange={this.handleOnChange}>
          <option value="HIGHEST_SCORE">Highest Score</option>
          <option value="LOWEST_SCORE">Lowest Score</option>
          <option value="NEWEST">Newest</option>
          <option value="OLDEST">Oldest</option>
        </select>
      </div>
    )
  }
}

export default SortPostComponent
