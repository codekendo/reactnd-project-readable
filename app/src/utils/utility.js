export const showDate = timestamp => {
  let a = new Date(timestamp)
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  let year = a.getFullYear()
  let month = months[a.getMonth()]
  let date = a.getDate()
  let hour = a.getHours()
  hour = ("00" + hour).slice(-2)
  let min = a.getMinutes()
  min = ("00" + min).slice(-2)
  // let sec = a.getSeconds();
  // sec = ('00'+sec).slice(-2);
  let time =
    date + " " + month + " " + year + " " + hour + ":" + min /*+ ':' + sec */
  return time
}

export const objectToArray = object => {
  return Object.keys(object).map(idString => object[idString])
}
