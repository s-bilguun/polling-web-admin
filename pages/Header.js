import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from './AuthContext';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
