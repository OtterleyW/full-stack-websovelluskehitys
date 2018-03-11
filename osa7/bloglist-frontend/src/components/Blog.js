import React from 'react';
import { Button, Card } from 'semantic-ui-react';

const Blog = ({ blog, giveLike }) => {
  console.log('Blog', blog);

  if (!blog) {
    return null;
  }

  const header = `${blog.title} (by ${blog.author})`;
  const likes = `${blog.likes}`;

  console.log('Likes', likes);
  return (
    <div>
      <div className="blog">
        <Card>
          <Card.Content header={header} />
          <Card.Content>
            <p>
              More information: <a href={blog.url}>{blog.url}</a>
            </p>
            <Button
              color="red"
              content="Like"
              icon="heart"
              onClick={() => giveLike(blog)}
              label={{
                basic: true,
                color: 'red',
                pointing: 'left',
                content: likes
              }}
            />
          </Card.Content>
          <Card.Content extra>Added by {blog.user.username}</Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Blog;
