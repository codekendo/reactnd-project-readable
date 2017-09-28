import { connect } from "react-redux"
import {setPostFilter} from "../actions/"
import SortPostComponent from '../components/SortPostComponent'

const mapDispatchToProps = (dispatch, ownProps) => ({
  // onClick: () => {
  //   dispatch(setPostFilter(ownProps.filter))
  // }
  onChange: (value)=>{
    dispatch(setPostFilter(value))
  }
})


const mapStateToProps = (state)=>({
  ...state
})


export default connect(mapStateToProps, mapDispatchToProps)(SortPostComponent)
