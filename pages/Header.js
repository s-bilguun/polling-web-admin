import React from 'react';
import Link from 'next/link';

const Header = ({ onUserManagementClick }) => {
  return (
    <header>
      <nav>
        <ul className="header-list">
          <li className="header-item">
            User count:
          </li>
          <li className="header-item">
            Poll count:
          </li>
          <li className="header-item">
            <Link href="/AddUser">
              <button className="add-users-button">Add User</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
