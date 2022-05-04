const Blogs = ({ blogs, username, handler}) => {
  return (
    <>
      <h2>Blogs</h2>
      <p>{username} logged in <button onClick={handler}>logout</button></p>
      {blogs.map(blog => <div key={blog.title}> {blog.title} {blog.author} </div>)}
    </>
  )
}

export default Blogs