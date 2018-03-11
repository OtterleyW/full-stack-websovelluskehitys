import React from 'react';
import { List } from 'semantic-ui-react';

const User = ({ user }) => {
  if (!user) {
    return null;
  }
  console.log(user);

  const blogs = user.blogs.map(blog => (
    <List.Item key={blog._id}>
      <List.Icon name="bookmark" />
      <List.Content> {blog.title}</List.Content>
    </List.Item>
  ));
  return (
    <div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>
      <List divided verticalAlign="middle">
        {blogs}
      </List>
    </div>
  );
};

export default User;
