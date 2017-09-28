import {SET_CATEGORIES} from "../actions"

export const categories = (state=[], action)=>{
  const {categories} = action
  switch(action.type){
    case SET_CATEGORIES:
    return categories
    default: return state
  }
}
