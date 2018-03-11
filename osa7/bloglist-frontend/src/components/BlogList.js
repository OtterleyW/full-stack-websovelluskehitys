import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const BlogList = props => {
  return (
    <div className="blogs">
      <h2>blogs</h2>
      <Table striped celled>
        <Table.Body>
          {props.blogs.map(blog => (
            <Table.Row key={blog._id}>
              <Table.Cell>
                <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default BlogList;
