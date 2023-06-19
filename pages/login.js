import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from './AuthContext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useContext(AuthContext); // Access the login function from the AuthContext
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Make an API request to the backend to authenticate the user
      const response = await axios.post('http://localhost:8001/auth/adminLogin', {
        email,
        password,
      });
  
      const { token } = response.data;
  
      // Call the login function from the AuthContext to set the user state
      login(token, email);
      console.log({ token, email })
  
      // Store the token in localStorage
      //    localStorage.setItem('user', JSON.stringify({ token, email }));
  
      // Redirect to the home page or the desired route after successful login
      router.push('/');

    } catch (error) {
      // Show error message or perform other actions for failed login
      console.log('Invalid credentials');
    }
  };
  
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
