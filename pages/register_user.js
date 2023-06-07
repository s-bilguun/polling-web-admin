import React from 'react';
import Header from './Header';
import '../src/app/globals.css'; // Import your global styles if needed

const AddUser = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <h1 className="add-user">Add User</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="text-input"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="text-input"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="text-input"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              className="text-input"
              id="role"
            >
              <option value="admin">User</option>
              <option value="user">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              className="text-input"
              id="profilePicture"
              type="file"
              accept="image/*"
            />
          </div>
          <button
            className="add-user-submit"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
