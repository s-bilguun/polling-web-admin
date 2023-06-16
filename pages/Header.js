import React, { useContext, useEffect, useState  } from 'react';
import Link from 'next/link';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [storedUser, setStoredUser] = useState(null);

  const handleLogout = () => {
    logout();
  };

  
  useEffect(() => {
    // Store user information in local storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    // Retrieve user information from local storage
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('user');
      const parsedData = storedData ? JSON.parse(storedData) : null;
      setStoredUser(parsedData);
    }
  }, [user]);

  return (
    <header>
    
      <nav>
        <ul className="header-list">
          <li>
            <Link href="/">
              <div className="logo">
                <img src="/logo.png" alt="Logo" />
              </div>
            </Link>
          </li>
          <li className="header-item header-item-spacer">
            <Link href="/register_user">
              <button className="add-users-button">Add User</button>
            </Link>
          </li>
          <li className="header-item header-item-spacer">
            <Link href="/poll_create">
              <button className="poll-create-button">Create Poll</button>
            </Link>
          </li>
          {storedUser && (
            <React.Fragment>
              <li className="header-item">
                Logged in as: {storedUser.email}
              </li>
              <li className="header-item logout-item">
              <div className="logout-button-container">
                <button className='logout-button' onClick={handleLogout}>Logout</button>
                </div>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
