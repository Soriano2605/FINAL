// src/components/AllResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/results')
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Quiz Results</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.id}>
              <td>{result.username}</td>
              <td>{result.score}</td>
              <td>{result.total_questions}</td>
              <td>{new Date(result.date_taken).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllResults;
