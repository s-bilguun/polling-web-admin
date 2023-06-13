import React, { useState } from 'react';
import Layout from './Layout';
import withAuth from './withAuth';
import { useRouter } from 'next/router';

const UserDetails = ({ id }) => {

  
  const router = useRouter();
  
  const [editMode, setEditMode] = useState(false); // State variable to track edit mode

  // Replace with your user data logic
  const [user, setUser] = useState({
    id,
    email: 'example@example.com',
    username: 'example',
    password: 'password123',
    role: 'admin',
    birthday: '1990-01-01',
  });

  const handleInputChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    // Logic to save the changes to the backend
    console.log('Saving changes:', user);
    setEditMode(false); // Exit edit mode after saving changes
  };

  const handleEditClick = () => {
    setEditMode(true); // Enter edit mode
  };

  const handleDeleteUser = () => {
    // Logic to delete the user from the backend
    console.log('Deleting user:', user.id);
    router.push('/');
  };

  return (
    <Layout>
<div className="container">
  <h1 className="add-user">User Details</h1>

  <div className="user-info">
    <div className="info-group">
      <label>Email:</label>
      {editMode ? (
        <input
          className="text-input"
          type="text"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
      ) : (
        <div>{user.email}</div>
      )}
    </div>

    <div className="info-group">
      <label>Username:</label>
      {editMode ? (
        <input
          className="text-input"
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      ) : (
        <div>{user.username}</div>
      )}
    </div>

    <div className="info-group">
      <label>Password:</label>
      {editMode ? (
        <input
          className="text-input"
          type="text"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      ) : (
        <div>{user.password}</div>
      )}
    </div>

    <div className="info-group">
      <label>Role:</label>
      {editMode ? (
        <select
          className="text-input"
          name="role"
          value={user.role}
          onChange={handleInputChange}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      ) : (
        <div>{user.role}</div>
      )}
    </div>

    <div className="info-group">
      <label>Birthday:</label>
      {editMode ? (
        <input
          className="text-input"
          type="text"
          name="birthday"
          value={user.birthday}
          onChange={handleInputChange}
        />
      ) : (
        <div>{user.birthday}</div>
      )}
    </div>
  </div>

  {editMode ? (
    <button className="add-user-submit" onClick={handleSaveChanges}>
      Save Changes
    </button>
  ) : (
    <div>
      <button className="edit-user" onClick={handleEditClick}>
        Edit
      </button>
      <button className="delete-user" onClick={handleDeleteUser}>
        Delete User
      </button>
    </div>
  )}
</div>
    </Layout>
  );
};

export default withAuth(UserDetails);
