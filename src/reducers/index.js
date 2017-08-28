import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from "../actions/"

const initalCategoryState = [
  {
    name: "react",
    path: "react"
  },
  {
    name: "redux",
    path: "redux"
  },
  {
    name: "udacity",
    path: "udacity"
  }
]

const initialPostState = [
  {
    id: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1467166872634,
    title: "Udacity is the best place to learn React",
    body: "Everyone says so after all.",
    author: "thingtwo",
    category: "react",
    voteScore: 6,
    deleted: false
  },
  {
    id: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1468479767190,
    title: "Learn Redux in 10 minutes!",
    body: "Just kidding. It takes more than 10 minutes to learn technology.",
    author: "thingone",
    category: "redux",
    voteScore: -5,
    deleted: false
  }
]

function reducer(state = { categories: initalCategoryState, posts:initialPostState }, action) {
  const { categories, posts } = action
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: [...categories]
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: [...posts]
      }
    default:
      return state
  }
}

export default reducer
