import { SET_POST_FILTER, RECEIVE_POSTS, UPVOTE, DOWNVOTE, DELETE_POST } from "../actions/index.js"

export const postFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case SET_POST_FILTER:
      return action.myFilter
    default:
      return state
  }
}

export const posts = (state = [], action) => {
  const { posts, id } = action
  switch (action.type) {
    case RECEIVE_POSTS:
      return [...posts]

    case UPVOTE:
      return [...state].map(postObject => {
        if (postObject.id === id) {
          postObject.voteScore++
        }
        return postObject
      })



      case DOWNVOTE:
      return [...state].map(postObject => {
        if (postObject.id === id) {
          postObject.voteScore--
        }
        return postObject
      })



      case DELETE_POST:
      return [...state].map(postObject => {
        if (postObject.id === id) {
          postObject.deleted=true
        }
        return postObject
      })

    default:
      return state
  }
}
