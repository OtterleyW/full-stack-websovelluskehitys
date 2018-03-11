import React from 'react';
const User = ({user}) => {

  if(!user){
    return null
  }
  console.log(user)

  const blogs = user.blogs.map(blog => <p key={blog._id}>{blog.title}</p>)
  return(
  <div>
    <h2>{user.name}</h2>

    <h3>Added blogs</h3>
    {blogs}
    
  </div>
)}

export default User
