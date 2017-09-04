export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_POSTS = "RECEIVE_POSTS"

const fetchCategories = dispatch => {
  const myInit = {
    headers: new Headers({ Authorization: "YmxhaDpibGFo" })
  }
  const myRequest = new Request("http://localhost:5001/categories", myInit)
  return fetch(myRequest, myInit).then(res => res.json()).then(data => data)
}

export const receivedCategories = data => ({
  type: RECEIVE_CATEGORIES,
  categories: data.categories
})

export const fetchCategoriesNow = () => dispatch => {
  return fetchCategories().then(data => dispatch(receivedCategories(data)))
}

const fetchPosts = dispatch => {
  const myInit = {
    headers: new Headers({ Authorization: "YmxhaDpibGFo" })
  }
  const myRequest = new Request("http://localhost:5001/posts", myInit)
  return fetch(myRequest, myInit).then(res=>res.json()).then(data=>data)
}
export const fetchPostsNow = () => dispatch => {
  return fetchPosts().then(data => dispatch(receivedPosts(data)))
}

const receivedPosts =data => ({
  type:RECEIVE_POSTS,
  posts:data
})




/**IGNORE BELOW **/
//tried to refactor but it did not work out since I probably need a switch statement make it work to when I send that data to the reducer
//
// export const receivedData = (data, thing) => {
//   const obj = {}
//   const capThing = thing.toUpperCase()
//   obj["type"] = "RECEIVE_" + capThing
//   obj[thing] = data
//   return obj
// }
// const fetchURL = (thing, dispatch) => {
//   const fetchUrl = "http://localhost:5001/" + thing
//   const myInit = {
//     headers: new Headers({ Authorization: "YmxhaDpibGFo" })
//   }
//   const myRequest = new Request(fetchUrl, myInit)
//
//   return fetch(myRequest, myInit).then(res => res.json())
// }
//
// export const fetchFunction = thing => (dispatch) => {
//    return fetchURL(thing, dispatch).then(data => dispatch(receivedData(data[thing], thing)))
//
// }
