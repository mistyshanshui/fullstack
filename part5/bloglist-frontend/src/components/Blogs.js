const Blogs = ({ blogs, username }) => {
  return (
    <>
      <h2>Blogs</h2>
      <p>{username} logged in</p>
      {blogs.map(blog => <div> {blog.title} {blog.author} </div>)}
    </>
  )
}

export default Blogs