import { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ addBlog }) => {

    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    const handleCreate = async (event) => {
        event.preventDefault()
        const blog = {
            author: author,
            url: url,
            title: title
        }
        await addBlog(blog)

        setAuthor('')
        setTitle('')
        setUrl('')
    }

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

BlogForm.propTypes = {
    addBlog : PropTypes.func.isRequired
}

export default BlogForm