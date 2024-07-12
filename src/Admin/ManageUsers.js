import React from 'react';
import './ManageUsers.css';
import UserList from './UserList';
import UserPendingList from './UserPendingList';

const ManageUsers = () => {
  return (
      <div className="users-container">
          <div className="card">
              <UserList />
          </div>
          <div className="card">
              <UserPendingList />
          </div>
      </div>
  );
};

export default ManageUsers;