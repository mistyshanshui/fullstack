import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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
    setTimeout(()=>{setMessage(null)}, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(()=>{
    const userString = window.localStorage.getItem('loggedBlogUser')
    if(userString){
      const user = JSON.parse(userString)
      setUser(user)
    }
  })

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
      displayMessage('credential error', true)
    }
  }

  const handleLogout = () =>{
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
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

  const blogList = (username, blogs, handler)=>(
    <Blogs blogs={blogs} username={username} handler={handler}/>
  )

  return (
    <div>
      <Notification message={message} isErrorMessage={isErrorMessage}/>      
      {user === null && loginForm()}
      {user !== null && blogList(user.username, blogs, handleLogout)}
    </div>
  )
}

export default App
