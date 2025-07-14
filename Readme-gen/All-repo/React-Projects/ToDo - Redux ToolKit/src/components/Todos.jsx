/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
    import React, { useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { removeToDo, updateToDo } from '../features/todo/todoSlices';
    
    function Todos() {
        const [editMode, setEditMode] = useState(false);
        const [editId, setEditId] = useState(null);
        const [input, setInput] = useState('');
        const dispatch = useDispatch();
        const todos = useSelector((state) => state.todo.todos);
    
            // const todos1 = useSelector((state) => state);
            // console.log(todos1);

            // const todos2 = useSelector((state) => state.todo);
            // console.log(todos2);

            // const todos3 = useSelector((state) => state.todo.todos);
            // console.log(todos3);



        const startEdit = (todo) => {
            setEditMode(true);
            setEditId(todo.id);
            setInput(todo.text);
        };
    
        const updateHandler = (event) => {
            event.preventDefault();
            updateTodo();
            setEditMode(false);
            setEditId(null);
            setInput('');
        };
    
        const updateTodo = () => {
            dispatch(updateToDo({ id: editId, text: input }));
        };
    
        const removeTodo = (id) => {
            dispatch(removeToDo(id));
        };
    
        return (
            <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">To-Do's</h1>
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li 
                            key={todo.id} 
                            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                        >
                            <span className="text-gray-700">{todo.text}</span>
                            <div className="flex space-x-1">
                                <button 
                                    onClick={() => startEdit(todo)} 
                                    className="bg-slate-500 px-5 text-white rounded-full px-2 py-1 hover:bg-purple-500 transition duration-200"
                                >
                                    🖋️
                                </button>
                                <button 
                                    onClick={() => removeTodo(todo.id)} 
                                    className="bg-slate-500 px-5 text-white rounded-full px-2 py-1 hover:bg-purple-500 transition duration-200"
                                >
                                    ❌
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
    
                {editMode && (
                    <form onSubmit={updateHandler} className="mt-4">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Update your task..."
                            className="bg-gray-100 text-gray-900 font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
                        />
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-500 transition-all duration-200 ease-in-out ml-2"
                        >
                            Update
                        </button>
                    </form>
                )}
            </div>
        );
    }
    
    export default Todos;