import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const login = (token, email) => {
    // Set the token in a cookie
    Cookies.set('adminToken', token);
    Cookies.set('userEmail', email);
    // Set the user state
    setUser({ token, email });
  };

  const logout = () => {
    // Remove the token from the cookie
    Cookies.remove('adminToken');
    Cookies.remove('userEmail');
    // Reset the user state
    setUser(null);

    router.push('/login');
  };

  const checkAuth = async () => {
    try {
      // Check if the token exists in the cookie
      const token = Cookies.get('adminToken');
  
      if (token) {
        // Decode the token to get the user's id and role
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userid;
        const role = decodedToken.role;
  
        // Retrieve user data from the server using the correct API endpoint
        const response = await axios.get(`http://localhost:8001/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const { email } = response.data;
  
        // Set the user state
        setUser({ token, email, role });
  
        // Store the email and role in localStorage
        if (typeof window !== 'undefined' && email && role) {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userRole', role);
        }
  
        // Return the updated user object
        return { token, email, role };
      } else {
        // Reset the user state
        setUser(null);
        return null;
      }
    } catch (error) {
      // Handle error (e.g., token expired, server error, etc.)
      console.log('Authentication error:', error);
      // Reset the user state
      setUser(null);
      return null;
    }
  };
  
  useEffect(() => {
    checkAuth(); // Call checkAuth when the component mounts
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
