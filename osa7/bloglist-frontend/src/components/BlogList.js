import React from 'react';
import Blog from '../components/Blog';

const BlogList = (props) => {
  return (
    <div className="blogs">
    <h2>blogs</h2>
    {props.blogs.map(blog => (
      <Blog key={blog._id} blog={blog} giveLike={props.giveLike} />
    ))}
    </div>
  )
}

export default BlogList

