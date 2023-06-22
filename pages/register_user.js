import React, { useState, useContext } from 'react';
import Header from './Header';
import '../src/app/globals.css'; // Import your global styles if needed
import withAuth from './withAuth';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from './AuthContext';


const AddUser = () => {
  const { user, setUser } = useContext(AuthContext);


  const router = useRouter();

  const handleAddUser = async (e) => {


    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const birthdate = document.getElementById('birthdate').value;
    const role = document.getElementById('role').options[document.getElementById('role').selectedIndex].text;

    try {
      // Submit the poll data to the backend
      const response = await axios.post(
        'http://localhost:8001/user/regUser',
        {
          username: username,
          email: email,
          password: password,
          birthdate: birthdate,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Reset the form

      // Go back to the index page or any other desired page
      router.push('/');
    } catch (error) {
      console.log('Error submitting poll:', error);
    }

  };
  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="add-user">Хэрэглэгч нэмэх</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="username">Нэр</label>
            <input
              className="text-input"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Нууц үг</label>
            <input
              className="text-input"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Нууц үг дахин оруулна уу</label>
            <input
              className="text-input"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Цахим хаяг</label>
            <input
              className="text-input"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Үүрэг</label>
            <select className="text-input" id="role">
            onChange={(e) => setRole(e.target.value)}
              <option value="Admin">User</option>
              <option value="User">Admin</option>
            </select>
          </div>
 
          <button className="add-user-submit" onClick={handleAddUser}>
            Үүсгэх
          </button>
        </form>
      </div>
    </div>
  );
};

export default withAuth(AddUser);
