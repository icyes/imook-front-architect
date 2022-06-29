function myFetch(url, method, data) {
  return fetch(url, {
    body: data ? JSON.stringify(data) : '', 
    method
  }).then((resp) => resp.json())
}

myFetch.get = (url) => {
  return myFetch(url, 'GET')
}

myFetch.post = (url, data) => {
  return myFetch(url, 'POST', data)
}

export default myFetch