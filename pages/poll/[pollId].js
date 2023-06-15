  import React, { useEffect, useState } from 'react';
  import { useRouter } from 'next/router';
  import Layout from '../Layout';
  import withAuth from '../withAuth';
  import axios from 'axios';

  const PollPage = ({ onUserManagementClick }) => {
    const router = useRouter();
    const { id } = router.query;

    const [poll, setPoll] = useState(null);

    const fetchPollDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/poll/${id}`);
        setPoll(response.data);
      } catch (error) {
        console.error('Error fetching poll details:', error);
      }
    };

    useEffect(() => {
      if (id) {
        fetchPollDetails();
      }
    }, [id]);

    // State to toggle edit mode
    const [editMode, setEditMode] = useState(false);

    // Function to handle deletion of the poll
    const handleDelete = () => {
      // Delete the poll logic

      // After deletion, navigate back to the admin page
      router.push('/');
    };

    // Function to handle editing of the poll
    const handleEdit = () => {
      // Enable edit mode
      setEditMode(true);
    };

    // Function to handle updating the poll details
    const handleUpdate = () => {
      // Update the poll details logic

      // Disable edit mode
      setEditMode(false);
    };

    useEffect(() => {
      // Add the page-specific class to the body element
      document.body.classList.add('page-polls-details');

      // Remove the page-specific class from the body element on unmount
      return () => {
        document.body.classList.remove('page-polls-details');
      };
    }, []);

    return (
      <Layout onUserManagementClick={onUserManagementClick}>
        <div className="container">
          <h1>Poll Details</h1>
          {poll && (
            <>
              {editMode ? (
                <div>
                  <label>
                    Question:
                    <input
                      type="text"
                      value={poll.question}
                      onChange={(e) => setPoll({ ...poll, question: e.target.value })}
                    />
                  </label>
                  <label>
                    Start Date:
                    <input
                      type="datetime-local"
                      value={poll.startDate}
                      onChange={(e) => setPoll({ ...poll, startDate: e.target.value })}
                    />
                  </label>
                  <label>
                    Expire Date:
                    <input
                      type="datetime-local"
                      value={poll.expireDate}
                      onChange={(e) => setPoll({ ...poll, expireDate: e.target.value })}
                    />
                  </label>
                  <button className="save-button" onClick={handleUpdate}>Save</button>
                </div>
              ) : (
                <div>
                  <h2>Question: {poll.question}</h2>
                  <p>Start Date: {poll.startDate}</p>
                  <p>Expire Date: {poll.expireDate}</p>
                  <p>Creator: {poll.userName}</p>
                  {/* Render poll options with vote counts */}
                  <ul>
                    {poll.options.map((option) => (
                      <li key={option.id}>
                        Option: {option.text}, Votes: {option.votes}
                      </li>
                    ))}
                  </ul>
                  {/* Button for deleting the poll */}
                  <div className="button-container">
                    <button className="edit-poll" onClick={handleEdit}>Edit Poll</button>
                    <button className="delete-poll" onClick={handleDelete}>Delete Poll</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Layout>
    );
  };

  export default withAuth(PollPage);
