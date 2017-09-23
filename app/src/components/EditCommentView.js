import React, { Component } from "react"
import {withRouter} from "react-router"
// import {connect} from "react-redux"
// import {} from "../actions"
// import serializeForm from "form-serialize"

class EditCommentView extends Component {
  componentDidMount() {}
  // handleSubmit = e => {
  //   e.preventDefault()
  //   //history.push("/")
  // }

  // handleGoBack = e => {
  //   const {history} = this.props
  //   e.preventDefault()
  //   history.goBack()
  // }

  render() {
    console.log("hello")
    return (
      <div>
        <h1>hello</h1>
      </div>
    ) //EndofReturn
  } //EndofRender
} //End of EditCommentView


export default withRouter(EditCommentView)
