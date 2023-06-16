import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../Layout';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import withAuth from '../withAuth';
import moment from 'moment';

const PollPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { id } = router.query;
  console.log('id passed from router.query', id);
  const [poll, setPoll] = useState();


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
  const handleUpdate = () => {
    if (!user) {
      console.log("Error: You must be logged in to update a poll");
      return;
    }
  
    if (id) {
      // Convert the date strings to the expected format
      const updatedPoll = {
        ...poll,
        startdate: moment(poll.startdate).format('YYYY-MM-DDTHH:mm:ss'),
        expiredate: moment(poll.expiredate).format('YYYY-MM-DDTHH:mm:ss'),
      };
  
      axios
        .put(`http://localhost:8001/poll/adminUpdatePoll/${id}`, updatedPoll)
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
                    value={poll.startate}
                    onChange={(e) => setPoll({ ...poll, startdate: e.target.value })}
                  />
                </label>
                <label>
                  Expire Date:
                  <input
                    type="datetime-local"
                    value={poll.expiredate}
                    onChange={(e) => setPoll({ ...poll, expiredate: e.target.value })}
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
