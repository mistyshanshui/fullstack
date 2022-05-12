import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isErrorMessage, setIsErrorMessage] = useState(false)

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

  const addBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token)
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      displayMessage('a new blog ' + returnedBlog.title + ' by ' + returnedBlog.author + ' is added')
    }
    catch (exception) {
      displayMessage(exception.message, true)
    }
  }

  const updateBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token)
      await blogService.update(newBlog)
      setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog))
    }
    catch (exception) {
      displayMessage(exception.message, true)
    }
  }

  const removeBlog = async (id) => {
    try {
      blogService.setToken(user.token)
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
    catch (exception) {
      dispatchEvent(exception.message, true)
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

  const blogList = (username, blogs) => (
    <>
      <h2>Blogs</h2>
      <p>{username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog">
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <Blogs blogs={blogs} updateBlog={updateBlog} removeBlog={removeBlog} />
    </>
  )

  const notification = () => (
    <Notification message={message} isErrorMessage={isErrorMessage} />
  )

  return (
    <div>
      {message && message !== '' && notification()}
      {user === null && loginForm()}
      {user !== null && blogList(user.username, blogs)}
    </div>
  )
}

export default App
