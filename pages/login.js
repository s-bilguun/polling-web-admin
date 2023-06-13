import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform authentication logic
    // Replace this with your actual authentication implementation
    if (username === 'admin' && password === 'admin') {
      // Redirect to the home page or the desired route after successful login
      router.push('/');
    } else {<div className="container">
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
      // Show error message or perform other actions for failed login
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
