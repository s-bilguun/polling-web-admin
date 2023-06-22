import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../src/app/globals.css';
import Layout from './Layout';
import axios from 'axios';
import withAuth from './withAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import DropdownSort from './DropdownSort';
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { RiSearchLine } from 'react-icons/ri';

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear().toString().slice(-2); // Extract the last two digits of the year
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const date = ('0' + dateTime.getDate()).slice(-2); // Add leading zero if needed
  const hours = ('0' + dateTime.getHours()).slice(-2); // Add leading zero if needed
  const minutes = ('0' + dateTime.getMinutes()).slice(-2); // Add leading zero if needed

  return `${year}-${month}-${date} ${hours}:${minutes}`;
};

const AdminPage = () => {
  const pollsPerPage = 10; // Number of polls to display per page

  const [polls, setPolls] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [initialPolls, setInitialPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch('http://localhost:8001/poll/list');
  
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPolls(data);
          setInitialPolls(data); // Store the original list of polls
          setNotFound(data.length === 0); // Set notFound based on the length of the polls
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

  const handlePollClick = (poll) => {
    console.log('Clicked on poll:', poll.id);
    router.push({
      pathname: '/poll/[id]',
      query: { id: poll.id },
    });
  };

  
  const sortOptions = [
    { label: 'Шинэ', value: 'new polls' },
    { label: 'Хуучин', value: 'old polls' },
    { label: 'A to Z', value: 'aToZ' },
    { label: 'Z to A', value: 'zToA' },
    { label: 'Идэвхтэй', value: 'active polls' },
  ];

  const handleSort = (selectedOption) => {
    const sortedPolls = [...polls];

    switch (selectedOption) {
      case 'new polls':
        sortedPolls.sort((a, b) => new Date(b.startdate) - new Date(a.startdate));
        break;
      case 'old polls':
        sortedPolls.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
        break;
      case 'aToZ':
        sortedPolls.sort((a, b) => a.question.localeCompare(b.question));
        break;
      case 'zToA':
        sortedPolls.sort((a, b) => b.question.localeCompare(a.question));
        break;
      case 'active polls':
        sortedPolls.sort((a, b) => {
          const now = new Date();
          const aIsActive = new Date(a.startdate) <= now && new Date(a.expiredate) >= now;
          const bIsActive = new Date(b.startdate) <= now && new Date(b.expiredate) >= now;

          // Sort active polls first
          if (aIsActive && !bIsActive) {
            return -1;
          }
          if (!aIsActive && bIsActive) {
            return 1;
          }

          // Sort by start date for both active and inactive polls
          return new Date(b.startdate) - new Date(a.startdate);
        });
        break;
      default:
        break;
    }

    setPolls(sortedPolls);
  };


  const [pollsPage, setPollsPage] = useState(1);
  const pollsTotalPages = Math.ceil(polls.length / pollsPerPage);
  const pollsStartIndex = (pollsPage - 1) * pollsPerPage;
  const pollsEndIndex = pollsPage * pollsPerPage;
  const currentPolls = polls.slice(pollsStartIndex, pollsEndIndex);

  const handlePollsPageChange = (page) => {
    setPollsPage(page);
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
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="poll-list-container w-1/2 pr-4">
            <h2 className="text-2xl font-semibold mb-2">Санал асуулгууд</h2>
            <div className='second-header'>
              <SearchBar setPolls={setPolls} setNotFound={setNotFound} initialPolls={initialPolls} />
              <div>
                Sort by <FontAwesomeIcon icon={faArrowDownWideShort} className='icon-initial' /> <DropdownSort options={sortOptions} onSelectSort={handleSort} />
              </div>
            </div>
            {notFound ? (
              <div className="error-container">
                <p>Хайлтад таарсан санал асуулга олдсонгүй</p>
              </div>
            ) : (
              <div className="poll-list">
                {currentPolls.map((poll) => (
                  <div key={poll.id} className="poll-item">
                    <div className="poll-details">
                      <div className="poll-username">
                        <FontAwesomeIcon icon={faUser} /> {poll.username}
                      </div>
                      <div className="poll-title-link" onClick={() => handlePollClick(poll)}>
                        {poll.question}
                      </div>
                    </div>
                    <div className="poll-datetime">
                      <p>Эхлэх: {formatDateTime(poll.startdate)}</p>
                      <p>Дуусах: {formatDateTime(poll.expiredate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pagination-container">
              {renderPollPagination()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(AdminPage);
