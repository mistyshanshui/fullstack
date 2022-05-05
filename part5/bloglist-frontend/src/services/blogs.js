import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogObject) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, blogObject, config)
    console.log(response.data)

    return response.data
  }
  catch(error){
    throw new Error(error.response.data.error)
  }
}

export default { getAll, setToken, create }