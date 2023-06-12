import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {

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
      
          <li className="header-item">
            User count:
          </li>
          <li className="header-item">
            Poll count:
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
