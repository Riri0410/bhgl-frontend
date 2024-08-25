import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('https://bfhl-backend-d77a.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Invalid JSON or API error:', error);
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOptions(
      e.target.checked
        ? [...selectedOptions, value]
        : selectedOptions.filter((option) => option !== value)
    );
  };

  return (
    <div className="App">
      <h1>21BCE3515</h1>
      <textarea
        placeholder='Enter JSON here...'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      <div>
        <input
          type='checkbox'
          value='numbers'
          onChange={handleOptionChange}
        /> Numbers
        <input
          type='checkbox'
          value='alphabets'
          onChange={handleOptionChange}
        /> Alphabets
        <input
          type='checkbox'
          value='highest_lowercase_alphabet'
          onChange={handleOptionChange}
        /> Highest Lowercase Alphabet
      </div>

      {response && (
        <div>
          <h2>Response</h2>
          <div>
            {selectedOptions.includes('numbers') && (
              <p>Numbers: {response.numbers.join(', ')}</p>
            )}
            {selectedOptions.includes('alphabets') && (
              <p>Alphabets: {response.alphabets.join(', ')}</p>
            )}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <p>
                Highest Lowercase Alphabet:{' '}
                {response.highest_lowercase_alphabet.join(', ')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
