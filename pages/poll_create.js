import React, { useState, useContext } from 'react';
import Layout from './Layout';
import withAuth from './withAuth';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import moment from 'moment';

const AddPoll = () => {
  const { user } = useContext(AuthContext);

  const [question, setQuestion] = useState('');
  const [startDateTime, setStartDateTime] = useState(moment().format('YYYY-MM-DDTHH:mm'));
  const [endDateTime, setEndDateTime] = useState('');
  const [choices, setChoices] = useState(['', '']);

  const handleAddChoice = () => {
    setChoices([...choices, '']);
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const router = useRouter();

  const handlePollSubmit = async (e) => {
    e.preventDefault();

    // Format the date and time strings
    const startDateTimeFormatted = `${startDateTime}:00`;
    const endDateTimeFormatted = `${endDateTime}:00`;

    // Prepare the poll data to be sent to the backend
    const pollData = {
      question,
      startDateTime: startDateTimeFormatted,
      endDateTime: endDateTimeFormatted,
      answer: choices,
    };

    try {
      // Submit the poll data to the backend
      const response = await axios.post(
        'http://localhost:8001/poll/createPoll',
        {
          question,
          startdate: startDateTimeFormatted,
          expiredate: endDateTimeFormatted,
          answer: choices,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Reset the form
      setQuestion('');
      setStartDateTime('');
      setEndDateTime('');
      setChoices(['', '']);

      // Go back to the index page or any other desired page
      router.push('/');
    } catch (error) {
      console.log('Error submitting poll:', error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <h1>Санал асуулга нэмэх</h1>
        <form className="form" onSubmit={handlePollSubmit}>
          <div className="form-group">
            <label htmlFor="question">Асуулт:</label>
            <input
              className="text-input"
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDateTime">Эхлэг цаг:</label>
            <input
              className="text-input"
              id="startDateTime"
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDateTime">Дуусах цаг:</label>
            <input
              className="text-input"
              id="endDateTime"
              type="datetime-local"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
  <label htmlFor="choices">Сонголтууд:</label>
  <div className="choices-container">
    {choices.map((choice, index) => (
      <div key={index}>
        <input
          className="text-input"
          id={`choice-${index}`}
          type="text"
          value={choice}
          onChange={(e) => handleChoiceChange(index, e.target.value)}
          required
        />
      </div>
      
    ))}
   
  </div>
</div>
<div className="buttons-container">
  <button className="add-user-submit" type="button" onClick={handleAddChoice}>Add choice</button>
  <button className="add-user-submit" type="submit">Үүсгэх</button>
</div>

        </form>
      </div>
    </Layout>
  );
};

export default withAuth(AddPoll);
