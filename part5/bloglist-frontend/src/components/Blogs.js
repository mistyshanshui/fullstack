import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = () => {
    const newBlog =  {...blog, likes : blog.likes +1}
    updateBlog(newBlog)
  }

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }
  const listStyle = { listStyle: 'none', paddingLeft: 0 }
  const blogBorder = { border: 'solid', margin: 3 }

  return (
    <div key={blog.title} style={blogBorder}>
      <div style={hide}>
        {blog.title} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={show}>
        <li style={listStyle}>{blog.title} <button onClick={toggleVisibility}>hide</button></li>
        <li style={listStyle}>{blog.url}</li>
        <li style={listStyle}>likes {blog.likes} <button onClick={updateLikes}>like</button></li>
        <li style={listStyle}>{blog.author}</li>
      </div>
    </div>
  )
}

const Blogs = ({ blogs, updateBlog }) => {
  return (
    <>
      {blogs.map(blog =>
        <Blog blog={blog} updateBlog={updateBlog} />
      )}
    </>
  )
}

export default Blogs