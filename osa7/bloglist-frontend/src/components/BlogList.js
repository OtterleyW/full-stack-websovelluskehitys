import React from 'react';
import Blog from '../components/Blog';
import { Link } from 'react-router-dom';


const BlogList = (props) => {
  return (
    <div className="blogs">
    <h2>blogs</h2>
    {props.blogs.map(blog => (
      <p key={blog._id}><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></p>
    ))}
    </div>
  )
}

export default BlogList

