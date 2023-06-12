import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../src/app/globals.css';
import Layout from './Layout';
import withAuth from './withAuth';

const AdminPage = () => {
  const polls = [
    {
      id: 1,
      username: 'User 1',
      title: 'What is your favorite color teteststteteststteteststteteststteteststteteststteteststtetestst?',
      startDatetime: '2023-06-01 10:00:00',
      endDatetime: '2023-06-01 12:00:00',
    },
    {
      id: 2,
      username: 'User 2',
      title: 'How often do you exercise?',
      startDatetime: '2023-06-02 15:00:00',
      endDatetime: '2023-06-02 16:30:00',
    },
    {
      id: 3,
      username: 'User 2',
      title: 'How often do you exercise?',
      startDatetime: '2023-06-02 15:00:00',
      endDatetime: '2023-06-02 16:30:00',
    },
    {
      id: 4,
      username: 'User 2',
      title: 'How often do you exercise?',
      startDatetime: '2023-06-02 15:00:00',
      endDatetime: '2023-06-02 16:30:00',
    },
  ];

  const router = useRouter();

  // State to store the list of registered users
  const [users, setUsers] = useState([
    { id: 1, name: 'UsernameeUsernameeee', email: 'verylongemailfortestingpurposes@gmail.com' },
    { id: 2, name: 'User 2', email: 'test' },
    { id: 3, name: 'User 3', email: 'test@gmail.com' },
    // Add more user objects as needed
  ]);

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

  return (
    <Layout onUserManagementClick={handleUserManagementClick}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Admin</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded manage-users-button"
          onClick={handleUserManagementClick}
        >
          Manage Users
        </button>
        <div className="flex">
          <div className="poll-list-container w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-2">Polls</h2>
            <div className="poll-list">
              {polls.map((poll) => (
                <div key={poll.id} className="poll-item">
                  <div className="poll-details">
                    <div className="poll-username">Username: {poll.username}</div>
                    <div className="poll-title-link">
                      <Link href={`/poll/${poll.id}`} passHref>
                        {poll.title}
                      </Link>
                    </div>
                  </div>
                  <div className="poll-datetime">
                    <p>Start Datetime: {poll.startDatetime}</p>
                    <p>End Datetime: {poll.endDatetime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showUserList && (
  <div className="user-list-container w-1/2 pl-4">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="username" onClick={() => handleUserClick(user.id)}>
              <span>{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            {/* ... */}
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


        </div>
      </div>
    </Layout>
  );
};

export default withAuth(AdminPage);
