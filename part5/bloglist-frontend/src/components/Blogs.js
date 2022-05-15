import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(newBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      removeBlog(blog.id)
    }
  }

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }
  const listStyle = { listStyle: 'none', paddingLeft: 0 }
  const blogBorder = { border: 'solid', margin: 3 }

  return (
    <div style={blogBorder}>
      <div style={hide}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={show}>
        <li style={listStyle}>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></li>
        <li style={listStyle}>{blog.url}</li>
        <li style={listStyle}>likes {blog.likes} <button onClick={updateLikes}>like</button></li>
        <li style={listStyle}>{blog.user.username}</li>
        <button onClick={remove}>remove</button>
      </div>
    </div>
  )
}

const Blogs = ({ blogs, updateBlog, removeBlog }) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes
  })
  return (
    <>
      {blogs.map(blog =>
        <Blog key={blog.title} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      )}
    </>
  )
}

export default Blogs