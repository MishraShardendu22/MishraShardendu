/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Name from './Name';

function App() {
  const [arr, SetArr] = useState([]);
  const [input, SetInput] = useState('');

  const ChangeController = (event) => {
    SetInput(event.target.value);
  };

  const AddToArray = () => {
    if (input !== '') {
      SetArr([...arr, input]);
      SetInput('');
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="h-40 flex items-center justify-center">
        <div className="p-4 flex bg-white rounded shadow">
          <input
            type="text"
            value={input}
            onChange={ChangeController}
            placeholder="Type Something..."
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button
            onClick={AddToArray}
            className="font-medium bg-gray-500 mx-4 px-4 hover:bg-violet-600 rounded-xl"
          >
            Add
          </button>
          <button
            onClick={refreshPage}
            className="font-medium bg-gray-500 mx-4 px-4 hover:bg-violet-600 rounded-xl"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="m-10 w-auto text-center">
        <h1 className="text-4xl">
          {input === '' ? '' : <span className="bg-orange-600 p-2 font-bold rounded-xl">{input}</span>}
        </h1>
      </div>
      <div>
        <ul className="text-2xl text-center">
          {arr.map((text, index) => (
            <li className="m-4 p-4 bg-orange-300 font-bold rounded-xl inline-block" key={index}>{text}</li>
          ))}
        </ul>
      </div>
      <Name />
    </div>
  );
}

export default App;
