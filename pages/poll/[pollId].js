import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Bar } from 'react-chartjs-2';
import { BarController, BarElement, LinearScale, CategoryScale, Chart } from 'chart.js';
import Layout from '../Layout';
import Header from '../Header';
import withAuth from './withAuth';

// Register the LinearScale with Chart.js
Chart.register(BarController, BarElement, LinearScale, CategoryScale);

const PollPage = ({ onUserManagementClick }) => {
  const router = useRouter();
  const { pollid } = router.query;

  // Fetch poll details based on pollid and populate the poll object
  const poll = {
    id: pollid,
    question: 'What is your favorite color?',
    startDate: '2023-06-01',
    expireDate: '2023-06-30',
    userName: 'Bilguun',
    options: [
      { id: 1, text: 'Red', votes: 10 },
      { id: 2, text: 'Blue', votes: 15 },
      { id: 3, text: 'Green', votes: 8 },
    ],
  };

  // Function to handle deletion of the poll
  const handleDelete = () => {
    // Delete the poll logic

    // After deletion, navigate back to the admin page
    router.push('/');
  };

  // Prepare the data for the chart
  const chartData = {
    labels: poll.options.map((option) => option.text),
    datasets: [
      {
        label: 'Votes',
        data: poll.options.map((option) => option.votes),
        backgroundColor: 'rgba(75, 132, 192, 0.6)',
      },
    ],
  };

  // Configure the options for the chart
  const chartOptions = {
    type: 'bar',
    scales: {
      x: {
        type: 'category',
        labels: poll.options.map((option) => option.text),
        ticks: {
          color: '#2986cc', // Set the x-axis label color based on the color scheme
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#2986cc', // Set the y-axis label color based on the color scheme
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#2986cc', // Set the legend label color to black
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
      
      <div className='container'>
        <h1>Poll Details</h1>
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
        <button onClick={handleDelete}>Delete Poll</button>
      </div>
    </Layout>
  );
};

export default withAuth(PollPage);
