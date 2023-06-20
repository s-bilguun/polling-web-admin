import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../src/app/globals.css';
import Layout from './Layout';
import axios from 'axios';
import withAuth from './withAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toLocaleDateString('en-US');
  const time = dateTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date} ${time}`;
};

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


  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8001/user/getUsers');

        if (response.ok) {
          const data = await response.json();
          setUsers(data.userList);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePollClick = (poll) => {
    console.log('Clicked on poll:', poll.id);
    router.push({
      pathname: '/poll/[id]',
      query: { id: poll.id },
    });
  };
  const handleUserClick = (id) => {
    router.push(`/user/${id}`);
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
  {showUserList ? 'Hide Users' : 'Manage Users'}
</button>
        <div className="flex">
          <div className="poll-list-container w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-2">Polls</h2>
            <div className="poll-list">
              {currentPolls.map((poll) => (
                <div key={poll.id} className="poll-item">
                  <div className="poll-details">
                    <div className="poll-username"><FontAwesomeIcon icon={faUser} /> {poll.username}</div>
                    <div className="poll-title-link" onClick={() =>
                      handlePollClick(poll)}>
                      {poll.question}
                    </div>

                  </div>
                  <div className="poll-datetime">
                    <p>Start Datetime: {formatDateTime(poll.startdate)}</p>
                    <p>End Datetime: {formatDateTime(poll.expiredate)}</p>
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
                        className="user-details"
                        onClick={() => handleUserClick(user.id)}
                      >
                        <div className="user-username">Username: {user.username}</div>
                        <div className="user-email">Email: {user.email}</div>
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