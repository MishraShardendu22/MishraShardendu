import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jokes, setJokes] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('/api/jokes')
      .then((resposne) => {
        console.log('Data received:', resposne.data);
        setJokes(resposne.data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  return (
    <div className="rounded-2xl min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="rounded-2xl text-4xl font-bold mb-6 text-blue-600">Hi Bro, How are you?</h1>
      <button 
        onClick={() => setCount(count + 1)}
        className="rounded-2xl px-4 py-2 bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors"
      >
        Count is {count}
      </button>
      <ul className="rounded-2xl mt-8 space-y-4">
        {jokes.length > 0 ? (
          jokes.map((joke, index) => (
            <li key={index} className="rounded-2xl p-4 bg-white shadow-md border border-gray-300">
              <h4 className="rounded-2xl text-lg text-gray-800">{joke.text || joke}</h4>
            </li>
          ))
        ) : (
          <li className="rounded-2xl p-4 bg-white shadow-md border border-gray-300">
            <h4 className="rounded-2xl text-lg text-gray-600">No jokes available</h4>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;