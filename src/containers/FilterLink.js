import { connect } from "react-redux"
import {setPostFilter} from "../actions/"
import FilterLinkComponent from '../components/FilterLinkComponent'


// Possible Component Link
//

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setPostFilter(ownProps.filter))
  }
})


const mapStateToProps = (state)=>({
  ...state
})


export default connect(mapStateToProps, mapDispatchToProps)(FilterLinkComponent)
