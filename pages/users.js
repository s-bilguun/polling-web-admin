import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useRouter } from 'next/router';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8001/user/getUsers');
        setUsers(response.data.userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const router = useRouter();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };


  const handleEditButtonClick = (user) => {
    if (editingUser) {
      // Save the changes if in editing mode
      handleEditUser(editingUser);
      setEditingUser(null);
    } else {
      // Enter editing mode
      setEditingUser(user);
    }
  };

  const handleEditUser = async (user) => {
    try {
      await axios.put(`http://localhost:8001/user/updateUser/${user.id}`, user);
      // Update the user list in the state
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm('Энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?');
    if (!confirmed) {
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8001/user/deleteUser/${id}`);
      // Update the user list in the state
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <h1 className="text">Бүртгэлтэй хэрэглэгчид</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      value={editingUser.username}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, username: e.target.value })
                      }
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, email: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser && editingUser.id === user.id ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value })
                      }
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.updatedAt)}</td>
                <td>
                  <button className="table-button" onClick={() => handleEditButtonClick(user)}>
                    {editingUser && editingUser.id === user.id ? "Хадгалах" : "Засах"}
                  </button>
                  <button className="table-button" onClick={() => handleDeleteUser(user.id)}>
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UsersPage;
