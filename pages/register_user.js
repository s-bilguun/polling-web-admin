import React from 'react';
import Header from './Header';
import '../src/app/globals.css'; // Import your global styles if needed
import withAuth from './withAuth';
import { useRouter } from 'next/router';

const AddUser = () => {


  const router = useRouter();

  const handleAddUser = (e) => {
    e.preventDefault();

    // TODO: Perform any necessary logic for adding the user

    // Navigate back to the index page
    router.push('/');
  };
  return (
    <div>
      <Header />
      <div className="container">
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
            <select className="text-input" id="role">
              <option value="admin">User</option>
              <option value="user">Admin</option>
            </select>
          </div>
          <div className="form-group">
  <label htmlFor="birthday">Birthday</label>
  <input
    className="text-input"
    id="birthday"
    type="date"
    placeholder="Birthday"
  />
</div>
          {/* <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              className="text-input"
              id="profilePicture"
              type="file"
              accept="image/*"
            />
          </div> */}
          <button className="add-user-submit" onClick={handleAddUser}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddUser);
