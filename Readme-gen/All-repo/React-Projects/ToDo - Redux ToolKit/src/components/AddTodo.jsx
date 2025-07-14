/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToDo } from '../features/todo/todoSlices'

function AddTodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    

    const addToHandler = (event) => {
        event.preventDefault();
        dispatch(addToDo(input));
        setInput('');
    }

    return (
        <div className="max-w-lg mx-auto p-4">
            <form onSubmit={addToHandler} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                <input 
                    onChange={(event) => setInput(event.target.value)} 
                    type="text" 
                    placeholder="Write your task..." 
                    value={input} 
                    className="flex-grow bg-gray-100 text-gray-900 font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out"
                >
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddTodo