import { SET_COMMENTS, UPVOTE_COMMENT, DOWNVOTE_COMMENT ,SET_COMMENT_FILTER} from "../actions"

export const commentFilter = (state = "HIGHEST_SCORE", action)=>{
  switch(action.type){
    case SET_COMMENT_FILTER:
    return action.commentFilter
    default:return state
  }
}

export const comments = (state = [], action) => {
  const { comments, id } = action
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
    default:
      return state
  }
}
