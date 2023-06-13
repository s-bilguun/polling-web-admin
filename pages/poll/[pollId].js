import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import { BarController, BarElement, LinearScale, CategoryScale, Chart } from 'chart.js';
import Layout from '../Layout';
import Header from '../Header';
import withAuth from './../withAuth';

// Register the LinearScale with Chart.js
Chart.register(BarController, BarElement, LinearScale, CategoryScale);
const PollPage = ({ onUserManagementClick }) => {
  const router = useRouter();
  const { pollid } = router.query;

  // Fetch poll details based on pollid and populate the poll object
  const [poll, setPoll] = useState({
    id: pollid,
    question: 'What is your favorite color?',
    startDate: '2023-06-01T00:00',
    expireDate: '2023-06-30T23:59',
    userName: 'Bilguun',
    options: [
      { id: 1, text: 'Red', votes: 10 },
      { id: 2, text: 'Blue', votes: 15 },
      { id: 3, text: 'Green', votes: 8 },
      { id: 4, text: 'Black', votes: 8 },
    ],
  });

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

  // Prepare the data for the chart
  const chartData = {
    labels: poll.options.map((option) => option.text),
    datasets: [
      {
        label: 'Votes',
        data: poll.options.map((option) => option.votes),
        backgroundColor: 'rgba(66, 165, 245, 0.6)',
      },
    ],
  };

  // Configure the options for the chart
  const chartOptions = {
    type: 'bar',
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#FFFFFF', // Set the x-axis tick color to white
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#FFFFFF', // Set the y-axis tick color to white
          font: {
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Set the y-axis grid color to a light gray
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF', // Set the legend label color to white
          font: {
            weight: 'bold',
          },
        },
      },
    },
 
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
            {/* Chart for displaying the poll results */}
            <div>
              <h3>Poll Results</h3>
              <Bar data={chartData} options={chartOptions} />
            </div>
            {/* Button for deleting the poll */}
            <div className="button-container">
  <button className="edit-poll" onClick={handleEdit}>Edit Poll</button>
  <button className="delete-poll" onClick={handleDelete}>Delete Poll</button>
</div>

          </div>
        )}
      </div>
    </Layout>
  );
};

export default withAuth(PollPage);
