export const getCategories = () => {
  const myInit = {
    headers: new Headers({'Authorization': 'YmxhaDpibGFo'})
  }
  const myRequest = new Request('http://localhost:5001/categories', myInit)

  return fetch(myRequest, myInit).then(res => res.json()).then(data => data).then(data=>console.log(data))
}
