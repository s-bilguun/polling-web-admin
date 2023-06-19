import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [email, setEmail] = useState(null);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    } else if (typeof window !== 'undefined') {
      const userEmail = Cookies.get('userEmail');
      if (userEmail) {
        setEmail(userEmail);
      }
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
          {email && (
            <React.Fragment>
              <li className="header-item">Logged in as: {email}</li>
              <li className="header-item logout-item">
                <div className="logout-button-container">
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
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
