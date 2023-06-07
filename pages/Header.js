import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push('/');
  };

  return (
    <header>
      <nav>
        <ul className="header-list">
          <li className="header-item">
            <button className="header-title" onClick={handleTitleClick}>
             Home page
            </button>
          </li>
          <li className="header-item">
            User count:
          </li>
          <li className="header-item">
            Poll count:
          </li>
          <li className="header-item">
            <Link href="/register_user">
              <button className="add-users-button">Add User</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
