import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../Layout';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import withAuth from '../withAuth';

const PollPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { id } = router.query;
  console.log('id passed from router.query', id);
  const [poll, setPoll] = useState();


  
  useEffect(() => {
    // Add the page-specific class to the body element
    document.body.classList.add('page-polls-details');

    // Remove the page-specific class from the body element on unmount
    return () => {
      document.body.classList.remove('page-polls-details');
    };
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8001/poll/${id}`)
        .then((res) => {
          setPoll(res.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data.error);
          } else {
            console.log('Error:', error.message);
          }
        });
    }
  }, [id]);

  // State to toggle edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to handle deletion of the poll
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8001/poll/adminDeletePoll/${id}`)
      .then((response) => {
        // After deletion, navigate back to the admin page
        router.push("/");
      })
      .catch((error) => {
        // Handle errors
      });
  };

  // Function to handle editing of the poll
  const handleEdit = () => {
    setEditMode(true);
  };
  // Function to handle updating the poll details
 // Function to handle updating the poll details
const handleUpdate = () => {
  if (!user) {
    console.log("Error: You must be logged in to update a poll");
    return;
  }

  if (id) {
    axios
      .put(`http://localhost:8001/poll/adminUpdatePoll/${id}`, {
        question: poll.question,
        startDate: poll.startDate,
        expireDate: poll.expireDate,
      })
      .then((response) => {
        console.log("Poll updated successfully");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.error);
        } else {
          console.log("Error:", error.message);
        }
      });
  }

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
    <Layout>
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
                <button className="save-button" onClick={handleUpdate}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h2>Question: {poll.question}</h2>
                <p>Start Date: {poll.startdate}</p>
                <p>Expire Date: {poll.expiredate}</p>
                <p>Creator: {poll.username}</p>
                <div className="button-container">
                  <button className="edit-poll" onClick={handleEdit}>
                    Edit Poll
                  </button>
                  <button className="delete-poll" onClick={handleDelete}>
                    Delete Poll
                  </button>
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
