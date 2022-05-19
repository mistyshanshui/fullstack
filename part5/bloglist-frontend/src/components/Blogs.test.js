import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { Blog } from './Blogs'

const mockUpdateHandler = jest.fn()
const mockRemoveHandler = jest.fn()


test('render blog', () => {
    const blog = {
        title: 'test title',
        author: 'testAuthor',
        url: 'http://blah',
        likes: 9,
        user: 'user10'
    }

    render(<Blog blog={blog} updateBlog={mockUpdateHandler} removeBlog={mockRemoveHandler} />)
    const title = screen.getByTestId('title and author')
    expect(title).toBeDefined()
    const url = screen.getByTestId('url')
    expect(url).not.toBeVisible()
    const likes = screen.getByTestId('likes')
    expect(likes).not.toBeVisible()
})

