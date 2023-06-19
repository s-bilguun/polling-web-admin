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
    Cookies.set('token', token);
    Cookies.set('userEmail', email);
    // Set the user state
    setUser({ token, email });
  };

  const logout = () => {
    // Remove the token from the cookie
    Cookies.remove('token');
    Cookies.remove('userEmail');
    // Reset the user state
    setUser(null);

    router.push('/login');
  };

  const checkAuth = async () => {
    try {
      // Check if the token exists in the cookie
      const token = Cookies.get('token');

      if (token) {
        // Decode the token to get the user's id
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userid;

        // Retrieve user data from the server using the correct API endpoint
        const response = await axios.get(`http://localhost:8001/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { email } = response.data;

        // Set the user state
        setUser({ token, email });

        // Store the email in localStorage
        if (typeof window !== 'undefined' && email) {
          localStorage.setItem('userEmail', email);
        }

        // Return the updated user object
        return { token, email };
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
