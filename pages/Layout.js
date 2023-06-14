import React from 'react';
import Header from './Header';

const Layout = ({ children, onUserManagementClick }) => {
  return (
    <div>
      
      <Header onUserManagementClick={onUserManagementClick} />
      <main>{children}</main>
      
    </div>
  );
};

export default Layout;
