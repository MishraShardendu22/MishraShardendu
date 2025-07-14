/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlices'

export const store = configureStore({
    reducer: {
        todo: todoReducer
    }
});
