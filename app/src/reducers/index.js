import { combineReducers } from "redux"
import { postFilter, posts } from "./posts"
import { categories } from "./categories"
import { comments, commentFilter } from "./comments"

const comboReducer = combineReducers({
  categories,
  postFilter,
  posts,
  comments,
  commentFilter
})

export default comboReducer
