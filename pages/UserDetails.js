import React from 'react';
import Layout from './Layout';

const UserDetails = ({ id }) => {
    // Replace with your user data logic
    const user = {
      id,
      email: 'example@example.com',
      username: 'example',
      password: 'password123',
      role: 'admin',
      birthday: '1990-01-01',
    };
  
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">User Details</h1>
  
          <div className="mb-4">
            <strong>Email:</strong> {user.email}
          </div>
  
          <div className="mb-4">
            <strong>Username:</strong> {user.username}
          </div>
  
          <div className="mb-4">
            <strong>Password:</strong> {user.password}
          </div>
  
          <div className="mb-4">
            <strong>Role:</strong> {user.role}
          </div>
  
          <div className="mb-4">
            <strong>Birthday:</strong> {user.birthday}
          </div>
        </div>
      </Layout>
    );
  };
  
  export default UserDetails;
  