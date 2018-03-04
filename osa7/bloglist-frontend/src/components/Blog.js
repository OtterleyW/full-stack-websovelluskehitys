import React from 'react';

const Blog = ({ blog, giveLike }) => {
  console.log('Blog', blog);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <div className="blog">
        <h2>{blog.title} (by {blog.author})</h2>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes{' '}
        <button onClick={() => giveLike(blog)}>like</button>
        <br />
        Added by {blog.user.username}
      </div>
    </div>
  );
};

export default Blog;
