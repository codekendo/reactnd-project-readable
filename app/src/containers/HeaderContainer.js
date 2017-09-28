import { connect } from "react-redux"

import { getCategoriesAction } from "../actions/"

import Header from "../components/Header"

const mapStateToProps = state => ({
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  getCategories: () => {
    dispatch(getCategoriesAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
