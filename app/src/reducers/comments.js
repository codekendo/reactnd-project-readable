import {
  SET_COMMENTS,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  SET_COMMENT_FILTER,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  SET_ONE_COMMENT
} from "../actions"

export const commentFilter = (state = "HIGHEST_SCORE", action) => {
  switch (action.type) {
    case SET_COMMENT_FILTER:
      return action.commentFilter
    default:
      return state
  }
}

export const comments = (state = [], action) => {
  const { comments, id, comment, modObject } = action

  switch (action.type) {
    case SET_COMMENTS:
      const transformedComments = comments.reduce((sum, comment) => {
        sum[comment.id] = comment
        return sum
      }, {})
      return {
        ...state,
        ...transformedComments
      }

    case UPVOTE_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore + 1
        }
      }

    case DOWNVOTE_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          voteScore: state[id].voteScore - 1
        }
      }

    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }

    case DELETE_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          deleted: true
        }
      }
    case SET_ONE_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          ...comment
        }
      }

    case UPDATE_COMMENT:
      return {
        ...state,
        [id]: {
          ...state[id],
          ...modObject
        }
      }
    default:
      return state
  }
}
