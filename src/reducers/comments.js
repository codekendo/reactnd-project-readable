import { SET_COMMENTS, UPVOTE_COMMENT, DOWNVOTE_COMMENT ,SET_COMMENT_FILTER, ADD_COMMENT, DELETE_COMMENT} from "../actions"

export const commentFilter = (state = "HIGHEST_SCORE", action)=>{
  switch(action.type){
    case SET_COMMENT_FILTER:
    return action.commentFilter
    default:return state
  }
}

export const comments = (state = [], action) => {
  const { comments, id, comment } = action
  switch (action.type) {
    case SET_COMMENTS:
      return comments

    case UPVOTE_COMMENT:
      return [...state].map(commentObject => {
        if (commentObject.id === id) {
          commentObject.voteScore++
        }
        return commentObject
      })




    case DOWNVOTE_COMMENT:
      return [...state].map(commentObject => {
        if (commentObject.id === id) {
          commentObject.voteScore--
        }
        return commentObject
      })

      case ADD_COMMENT:
      return [...state, {...comment}]

      case DELETE_COMMENT:
      return [...state].map(commentObject => {
        if (commentObject.id === id) {
          commentObject.deleted=true
        }
        return commentObject
      })




    default:
      return state
  }


}
