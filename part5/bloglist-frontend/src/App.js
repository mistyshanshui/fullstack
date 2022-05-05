import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const displayMessage = (message, isErrorMessage = false) => {
    setMessage(message)
    setIsErrorMessage(isErrorMessage)
    setTimeout(() => { setMessage(null) }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userString = window.localStorage.getItem('loggedBlogUser')
    if (userString) {
      const _user = JSON.parse(userString)
      setUser(_user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('login using ', username, password)
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      displayMessage(exception.response.data.error, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        author: author,
        url: url,
        title: title
      }
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      displayMessage('a new blog ' + returnedBlog.title + ' by ' + returnedBlog.author + ' is added')
      setAuthor('')
      setTitle('')
      setUrl('')
    }
    catch (exception) {
      displayMessage(exception.message, true)
    }
  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log into application</h2>
      <div>
        username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const CreateBlog = ({ title, author, url }) => {
    return (
      <form onSubmit={handleCreate}>
        <h2>create new</h2>
        <div>title <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />      </div>
        <div>author <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>url <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} /></div>
        <button type="submit">create</button>
      </form>
    )
  }

  const blogList = (username, blogs) => (
    <>
      <h2>Blogs</h2>
      <p>{username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLable="new blog">
        <CreateBlog title={title} author={author} url={url} />
      </Togglable>
      <Blogs blogs={blogs} username={username} />
    </>
  )

  const notification = () => (
    <Notification message={message} isErrorMessage={isErrorMessage} />
  )

  return (
    <div>
      {message !== null && notification()}
      {user === null && loginForm()}
      {user !== null && blogList(user.username, blogs, handleLogout)}
    </div>
  )
}

export default App
