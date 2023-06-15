import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import withAuth from './withAuth';
import { useRouter } from 'next/router';

const UserDetails = ({ id }) => {
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/user/${id}`);
        console.log('Response data:', response.data);
        setUser(response.data.user); // Assign the user object to setUser
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  console.log('User:', user);

  const handleInputChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      console.log('Saving changes:', user);
      await axios.put(`http://localhost:8001/user/updateUser/${user.id}`, {
        email: user.email,
        username: user.username,
        birthdate: user.birthdate,
        role: user.role,
      });
      setEditMode(false); // Exit edit mode after saving changes
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleEditClick = () => {
    setEditMode(true); // Enter edit mode
  };

const handleDeleteUser = async () => {
  try {
    console.log('Deleting user:', user.id);
    await axios.delete(`http://localhost:8001/user/deleteUser/${user.id}`);
    router.push('/');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


  return (
    <Layout>
      <div className="container">
        <h1 className="add-user">User Details</h1>

        {user ? (
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

            {/* <div className="info-group">
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
            </div> */}

            <div className="info-group">
              <label>Role:</label>
              {editMode ? (
                <select
                  className="text-input"
                  name="role"
                  value={user.role}
                  onChange={handleInputChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
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
                  name="birthdate"
                  value={user.birthdate}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{user.birthdate}</div>
              )}
            </div>
          </div>
        ) : user === null ? (
          <div>User details not found.</div>
        ) : (
          <div>Loading user details...</div>
        )}

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
