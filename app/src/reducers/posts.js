import {
  SET_POST_FILTER,
  SET_POSTS,
  UPVOTE,
  DOWNVOTE,
  DELETE_POST,
  EDIT_POST
} from "../actions/index.js"

export const postFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case SET_POST_FILTER:
      return action.myFilter
    default:
      return state
  }
}

export const posts = (state = [], action) => {
  const { posts, id, post } = action
  const findIndex = id => state.findIndex(post => post.id === id)

  switch (action.type) {
    case SET_POSTS:
      return [...posts]
    case UPVOTE:
      const index = findIndex(id)

      return [...state, state[index].voteScore++]

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
          postObject.deleted = true
        }
        return postObject
      })

    case EDIT_POST:
      return [...state].map(postObject => {
        if (postObject.id === id) {
          return post
        } else {
          return postObject
        }
      })

    default:
      return state
  }
}
