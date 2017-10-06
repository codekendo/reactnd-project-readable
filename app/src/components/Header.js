import React, { Component } from "react"
import { Link } from "react-router-dom"

class Header extends Component {
  componentDidMount() {
    const { getCategories, categories } = this.props
    !categories && getCategories()
  }

  render() {
    const { categories } = this.props
    return (
      <div className="container">
        <nav className="navbar" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item is-3 title  " to="/">
              Readable
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              {categories &&
                categories.map((category, index) =>
                  <div key={index} className="navbar-item">
                    <Link to={`/${category.name}`}>
                      {category.name}
                    </Link>
                  </div>
                )}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Header
