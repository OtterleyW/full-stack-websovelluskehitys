import React from 'react';
import { Link } from 'react-router-dom';

const Users = props => {
  const userRows = props.users.map(user => (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  ));

  return (
    <div className="users">
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <td width="150px" />
            <td>
              <h3>blogs added</h3>
            </td>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </table>
    </div>
  );
};

export default Users;
