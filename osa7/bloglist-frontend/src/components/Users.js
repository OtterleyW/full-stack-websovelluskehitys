import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const Users = props => {
  const userRows = props.users.map(user => (
    <Table.Row key={user.id}>
      <Table.Cell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </Table.Cell>
      <Table.Cell>{user.blogs.length}</Table.Cell>
    </Table.Row>
  ));

  return (
    <div className="users">
      <h2>users</h2>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <h3>user</h3>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h3>blogs added</h3>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{userRows}</Table.Body>
      </Table>
    </div>
  );
};

export default Users;
