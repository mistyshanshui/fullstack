
const Blogs = ({ blogs, username}) => {
  return (
    <>
      {blogs.map(blog => <div key={blog.title}> {blog.title} {blog.author} </div>)}
    </>
  )
}

export default Blogs