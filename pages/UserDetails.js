import React, { useState } from 'react';
import Layout from './Layout';

const UserDetails = ({ id }) => {
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
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="add-user">User Details</h1>

        <form className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="text-input"
              id="email"
              type="text"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="text-input"
              id="username"
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="text-input"
              id="password"
              type="text"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              className="text-input"
              id="role"
              name="role"
              value={user.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              className="text-input"
              id="birthday"
              type="text"
              name="birthday"
              value={user.birthday}
              onChange={handleInputChange}
            />
          </div>

          <button className="add-user-submit" type="submit" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UserDetails;
