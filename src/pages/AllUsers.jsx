// src/pages/AllUsers.jsx
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/api';

const AllUsers = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data); // now using setUsers
  };


    fetchUsers(); // Run once on component mount
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.name}</strong> – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
