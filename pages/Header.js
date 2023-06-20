import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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

  const [darkTheme, setDarkTheme] = useState(false);
  const handleToggle = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setDarkTheme(false);
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      window.localStorage.setItem('theme', 'light');
    }
  }, [darkTheme]);

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
          <li>
            <div className="toggle-container">
              <FontAwesomeIcon
                icon={darkTheme ? faMoon : faSun}
                className={`toggle-icon ${darkTheme ? 'moon' : 'sun'}`}
                onClick={handleToggle}
              />
            </div>
          </li>

          <li className="header-item header-item-spacer">
            <Link href="/register_user">
              <button className="add-users-button"><FontAwesomeIcon icon={faUserPlus} /> Add User</button>
            </Link>
          </li>
          <li className="header-item header-item-spacer">
            <Link href="/poll_create">
              <button className="poll-create-button"><FontAwesomeIcon icon={faPlus} /> Create Poll</button>
            </Link>
          </li>
          {email && (
            <React.Fragment>
              <li className="header-item">Logged in as: {email}</li>
              <li className="header-item logout-item">
                <div className="logout-button-container">
                  <button className="logout-button" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
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
