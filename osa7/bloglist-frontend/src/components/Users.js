import React from 'react';

const Users = props => {
  console.log('User props', props);
  const userRows = props.users.map(user => (
    <tr>
      <td width="150px">{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  ));

  console.log(userRows);
  return (
    <div className="users">
      <h2>users</h2>
      <table>
        <tr>
          <td width="150px" />
          <td>
            <h3>blogs added</h3>
          </td>
        </tr>
      </table>
      {userRows}
    </div>
  );
};

export default Users;
