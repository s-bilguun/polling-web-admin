import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../src/app/globals.css';
import Layout from './Layout';
import axios from 'axios';
import withAuth from './withAuth';


const AdminPage = () => {
  const pollsPerPage = 5; // Number of polls to display per page
  const usersPerPage = 10; // Number of users to display per page
 
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('http://localhost:8001/poll/list');

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPolls(data);
        } else {
          console.error('Failed to fetch polls');
        }
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, []);

  const router = useRouter();

  // State to store the list of registered users
  const [users, setUsers] = useState([
    { id: 1, name: 'UsernameeUsernameeee', email: 'verylongemailfortestingpurposes@gmail.com' },
    { id: 2, name: 'User 2', email: 'test' },
    { id: 3, name: 'User 3', email: 'test@gmail.com' },
    { id: 4, name: 'User 4', email: 'test@gmail.com' },
    { id: 5, name: 'User 5', email: 'test@gmail.com' },
    { id: 6, name: 'User 6', email: 'test@gmail.com' },
    { id: 7, name: 'User 7', email: 'test@gmail.com' },
    { id: 8, name: 'User 8', email: 'test@gmail.com' },
    { id: 9, name: 'User 9', email: 'test@gmail.com' },
    { id: 10, name: 'User 10', email: 'test@gmail.com' },
    { id: 11, name: 'User 11', email: 'test@gmail.com' },
    { id: 12, name: 'User 12', email: 'test@gmail.com' },
    { id: 13, name: 'User 13', email: 'test@gmail.com' },
    { id: 14, name: 'User 14', email: 'test@gmail.com' },
    { id: 15, name: 'User 15', email: 'test@gmail.com' },
    { id: 16, name: 'User 16', email: 'test@gmail.com' },
    { id: 17, name: 'User 17', email: 'test@gmail.com' },
    { id: 18, name: 'User 18', email: 'test@gmail.com' },
    { id: 19, name: 'User 19', email: 'test@gmail.com' },
    { id: 20, name: 'User 20', email: 'test@gmail.com' },
    { id: 21, name: 'User 21', email: 'test@gmail.com' },
    { id: 22, name: 'User 22', email: 'test@gmail.com' },
    { id: 23, name: 'User 23', email: 'test@gmail.com' },

    // Add more user objects as needed
  ]);

  // const [users, setUsers] = useState([]);
  // const fetchUsers = async () => {
  //   try {
  //     const response = await fetch('/api/users'); // Adjust the API endpoint URL according to your backend

  //     if (response.ok) {
  //       const data = await response.json();
  //       setUsers(data);
  //     } else {
  //       console.error('Failed to fetch users');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  // fetchUsers();

  const handlePollClick = (id) => {
    router.push(`/poll/${id}`);
  };

  const handleUserClick = (id) => {
    router.push(`/user/${id}`);
  };

  const handleRemoveUser = (userId) => {
    // Logic to remove the user from the backend
    // After successful removal, update the users state
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleTogglePollCreation = (userId) => {
    // Logic to toggle the user's poll creation access in the backend
    // After successful toggle, update the users state
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, canCreatePoll: !user.canCreatePoll } : user
      )
    );
  };

  const [showUserList, setShowUserList] = useState(false);

  const handleUserManagementClick = () => {
    setShowUserList(!showUserList);
  };

   // Pagination state for polls list
   const [pollsPage, setPollsPage] = useState(1);
   const pollsTotalPages = Math.ceil(polls.length / pollsPerPage);
   const pollsStartIndex = (pollsPage - 1) * pollsPerPage;
   const pollsEndIndex = pollsPage * pollsPerPage;
   const currentPolls = polls.slice(pollsStartIndex, pollsEndIndex);
 
   // Pagination state for users list
   const [usersPage, setUsersPage] = useState(1);
   const usersTotalPages = Math.ceil(users.length / usersPerPage);
   const usersStartIndex = (usersPage - 1) * usersPerPage;
   const usersEndIndex = usersPage * usersPerPage;
   const currentUsers = users.slice(usersStartIndex, usersEndIndex);
 
 const handlePollsPageChange = (page) => {
  setPollsPage(page);
};

const handleUsersPageChange = (page) => {
  setUsersPage(page);
};
const renderPollPagination = () => {
  const pages = [];
  for (let i = 1; i <= pollsTotalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`pagination-button ${pollsPage === i ? 'active' : ''}`}
        onClick={() => handlePollsPageChange(i)}
      >
        {i}
      </button>
    );
  }
  return pages;
};

const renderUserPagination = () => {
  const pages = [];
  for (let i = 1; i <= usersTotalPages; i++) {
    pages.push(
      <button
        key={i}
        className={`pagination-button ${usersPage === i ? 'active' : ''}`}
        onClick={() => handleUsersPageChange(i)}
      >
        {i}
      </button>
    );
  }
  return pages;
};
return (
  <Layout onUserManagementClick={handleUserManagementClick}>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin dashboard</h1>
      <button className="manage-users-button" onClick={handleUserManagementClick}>
        Manage Users
      </button>
      <div className="flex">
        <div className="poll-list-container w-1/2 pr-4">
          <h2 className="text-2xl font-semibold mb-2">Polls</h2>
          <div className="poll-list">
            {currentPolls.map((poll) => (
              <div key={poll.id} className="poll-item">
                <div className="poll-details">
                  <div className="poll-username">Username: {poll.username}</div>
                  <div className="poll-title-link">
                    <Link href={`/poll/${poll.id}`} passHref>
                      {poll.question}
                    </Link>
                  </div>
                </div>
                <div className="poll-datetime">
                  <p>Start Datetime: {poll.startdate}</p>
                  <p>End Datetime: {poll.expiredate}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination-container">
            {renderPollPagination()}
          </div>
        </div>
        {showUserList && (
          <div className="user-list-container w-1/2 pl-4">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Registered Users</h2>
              <ul>
                {currentUsers.map((user) => (
                  <li key={user.id}>
                    <div
                      className="username"
                      onClick={() => handleUserClick(user.id)}
                    >
                      <span>{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    {/* ... */}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pagination-container">
              {renderUserPagination()}
            </div>
          </div>
        )}
      </div>
    </div>
  </Layout>
);
};

export default withAuth(AdminPage);