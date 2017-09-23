
import React, { Component } from "react"


class FilterLinkComponent extends Component {
  handleFilterEvent = e => {
    e.preventDefault()
    this.props.onClick()
  }
  render() {
    return (
      <div>
        <a onClick={this.handleFilterEvent}>
          {this.props.children}
        </a>
      </div>
    )
  }
}


export default FilterLinkComponent
