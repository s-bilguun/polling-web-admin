import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

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
          <li className="header-item">
            <Link href="/register_user">
              <button className="add-users-button">Add User</button>
            </Link>
          </li>
          <li className="header-item">
            <Link href="/poll_create">
              <button className="poll-create-button">Create Poll</button>
            </Link>
          </li>
          {user && (
            <React.Fragment>
              <li className="header-item">
                Logged in as: {user.email}
              </li>
              <li className="header-item">
                <button className='add-users-button' onClick={handleLogout}>Logout</button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
