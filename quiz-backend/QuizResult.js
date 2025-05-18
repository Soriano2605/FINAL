
import React from 'react';
import axios from 'axios';

const Result = ({ username, score, totalQuestions }) => {
  const saveResult = async () => {
    try {
      await axios.post('http://localhost:3001/api/results', {
        username,
        score,
        total_questions: totalQuestions
      });
      console.log('Result saved!');
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  
  React.useEffect(() => {
    saveResult();
  }, []);

  return (
    <div>
      <h2>Quiz Completed</h2>
      <p>Username: {username}</p>
      <p>Score: {score}/{totalQuestions}</p>
    </div>
  );
};

export default Result;
