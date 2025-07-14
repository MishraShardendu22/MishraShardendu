/* eslint-disable no-unused-vars */
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addToDo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo);
        },
        removeToDo: (state, action) => {
            const idToDelete = action.payload;
            state.todos = state.todos.filter(
                (todo) => todo.id !== idToDelete
            );
        },
        updateToDo: (state, action) => {
            const { id, text } = action.payload;
            const todoIndex = state.todos.findIndex(
                todo => todo.id === id);
            if (todoIndex !== -1) {
                state.todos[todoIndex].text = text;
            }
        }
    }  
});

export const { addToDo, removeToDo, updateToDo } = todoSlice.actions;

export default todoSlice.reducer;
