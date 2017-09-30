export const SET_CATEGORIES = "SET_CATEGORIES"
export const SET_POSTS = "SET_POSTS"
export const SEND_NEW_POST = "SEND_NEW_POST"
export const UPDATE_INDIVIDUAL_POST = "UPDATE_INDIVIDUAL_POST"
export const SET_POST_FILTER = "SET_POST_FILTER"
export const UPVOTE = "UPVOTE"
export const DOWNVOTE = "DOWNVOTE"
export const SET_COMMENTS = "SET_COMMENTS"
export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"
export const SET_COMMENT_FILTER = "SET_COMMENT_FILTER"
export const DELETE_POST = "DELETE_POST"
export const EDIT_POST = "EDIT_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPDATE_COMMENT = "UPDATE_COMMENT"

const header = {
  Accept: "application/json",
  Authorization: "Basic YmxhaDpibGFo",
  "Content-Type": "application/json"
}
const url = "http://localhost:3001/"

export const getCategoriesAction = () => dispatch => {
  return getCategoriesThroughApi().then(data =>
    dispatch(setCategoriesInRedux(data))
  )
}

const getCategoriesThroughApi = dispatch => {
  const myInit = {
    method: "GET",
    headers: header
  }

  return fetch(url + "categories", myInit)
    .then(res => res.json())
    .then(data => data)
}

const setCategoriesInRedux = data => ({
  type: SET_CATEGORIES,
  categories: data.categories
})

export const getPostsAction = () => dispatch => {
  return getPostsThroughApi().then(data => dispatch(setPostsInRedux(data)))
}


const getPostsThroughApi = dispatch => {
  const myInit = {
    method: "GET",
    headers: header
  }
  return fetch(url + "posts", myInit).then(res => res.json()).then(data => data)
}


const setPostsInRedux = data => ({ type: SET_POSTS, posts: data })

export const sendPostToServerAction = bodyObject => dispatch => {
  return fetchSendPost(bodyObject)
}

const fetchSendPost = bodyObject => {
  const myInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify(bodyObject)
  }
  return fetch(url + "posts", myInit).then(res => res.json()).then(data => data)
}

export const setPostFilter = myFilter => ({ type: SET_POST_FILTER, myFilter })

export const upVoteThisPost = id => dispatch => {
  upVoteThroughApi(id).then(res => dispatch(upVoteThroughRedux(id)))
}

const upVoteThroughApi = id => {
  const myInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ option: "upVote" })
  }

  return fetch(`${url}posts/${id}`, myInit)
}

const upVoteThroughRedux = id => ({ type: UPVOTE, id })

export const downVoteThisPost = id => dispatch => {
  downVoteThroughApi(id).then(res => dispatch(downVoteThroughRedux(id)))
}

const downVoteThroughApi = id => {
  const myInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ option: "downVote" })
  }
  return fetch(`${url}posts/${id}`, myInit)
}

const downVoteThroughRedux = id => ({ type: DOWNVOTE, id })

export const getCommentsById = id => dispatch => {
  return getCommentsThroughAPI(id).then(data =>
    dispatch(setCommentsThroughRedux(data))
  )
}

const getCommentsThroughAPI = id => {
  const myInit = {
    method: "GET",
    headers: header
  }

  return fetch(`${url}posts/${id}/comments`, myInit).then(res => res.json())
}

const setCommentsThroughRedux = comments => ({ type: SET_COMMENTS, comments })

export const upVoteThisComment = id => dispatch => {
  upVoteCommentThoughApi(id).then(res =>
    dispatch(upVoteCommentThroughRedux(id))
  )
}

const upVoteCommentThoughApi = id => {
  const myInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ option: "upVote" })
  }

  return fetch(`${url}comments/${id}`, myInit)
}

const upVoteCommentThroughRedux = id => ({ type: UPVOTE_COMMENT, id })

export const downVoteThisComment = id => dispatch => {
  downVoteCommentThoughApi(id).then(res =>
    dispatch(downVoteCommentThroughRedux(id))
  )
}

const downVoteCommentThoughApi = id => {
  const myInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ option: "downVote" })
  }
  return fetch(`${url}comments/${id}`, myInit)
}

const downVoteCommentThroughRedux = id => ({ type: DOWNVOTE_COMMENT, id })

export const setCommentFilter = commentFilter => ({
  type: SET_COMMENT_FILTER,
  commentFilter
})

export const deletePostAction = id => dispatch => {
  return deletePostThroughAPI(id).then(() =>
    dispatch(deletePostThroughRedux(id))
  )
}

const deletePostThroughAPI = id => {
  const myInit = {
    method: "DELETE",
    headers: header
  }
  return fetch(`${url}posts/${id}`, myInit)
}

const deletePostThroughRedux = id => ({ type: DELETE_POST, id })

export const editPostAction = (postObject, id) => dispatch => {
  return editPostThroughApi(postObject, id).then(() =>
    dispatch(editPostThroughRedux(postObject, id))
  )
}

const editPostThroughApi = (postObject, id) => {
  const myInit = {
    method: "PUT",
    headers: header,
    body: JSON.stringify(postObject)
  }
  return fetch(`${url}posts/${id}`, myInit)
}

const editPostThroughRedux = (postObject, id) => ({
  type: EDIT_POST,
  post: postObject,
  id
})

export const addComment = comment => dispatch => {
  addCommentThroughApi(comment).then(() =>
    dispatch(addCommentThroughRedux(comment))
  )
}

const addCommentThroughApi = comment => {
  const myInit = {
    method: "POST",
    headers: header,
    body: JSON.stringify(comment)
  }
  return fetch(`${url}comments/`, myInit)
}

const addCommentThroughRedux = comment => ({
  type: ADD_COMMENT,
  comment: comment
})

export const deleteComment = id => dispatch => {
  deleteCommentThroughApi(id).then(() =>
    dispatch(deleteCommentThroughRedux(id))
  )
}

const deleteCommentThroughApi = id => {
  const myInit = {
    method: "DELETE",
    headers: header
  }
  return fetch(`${url}comments/${id}`, myInit)
}

const deleteCommentThroughRedux = id => ({ type: DELETE_COMMENT, id })

export const updateCommentAction = (id, modObject) => dispatch => {
  updateCommentThroughApi(id, modObject).then(() =>
    dispatch(updateCommentThroughRedux(id, modObject))
  )
}
const updateCommentThroughApi = (id, body) => {
  const myInit = {
    method: "PUT",
    headers: header,
    body: JSON.stringify(body)
  }
  return fetch(`${url}comments/${id}`, myInit)
}

const updateCommentThroughRedux = (id, modObject) => ({
  type: UPDATE_COMMENT,
  id,
  modObject
})
