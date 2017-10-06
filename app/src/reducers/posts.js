import {
  SET_POST_FILTER,
  SET_POSTS,
  UPVOTE,
  DOWNVOTE,
  DELETE_POST,
  EDIT_POST,
  ADD_POST
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
  switch (action.type) {
    case SET_POSTS:
      return posts.reduce((sum, value) => {
        sum[value.id] = value
        return sum
      }, {})

    case UPVOTE:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore + 1
        }
      }

    case DOWNVOTE:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore - 1
        }
      }

    case DELETE_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          deleted: true
        }
      }

    case EDIT_POST:
      return {
        ...state,
        [id]: {
          ...state[id],
          ...post
        }
      }
    case ADD_POST:
      return {
        ...state,
        [post.id]: post
      }

    default:
      return state
  }
}
