import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    history: [],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // Action to set the current message in the state
        setMessage(state, action) {
            state.message = action.payload; // Updates the message state with the provided payload
        },
        // Action to add a new message to the history
        addToHistory(state, action) {
            state.history.push(action.payload); // Directly adds the new message to the history array
        },
        // Action to clear the current message from the state
        clearMessage(state) {
            state.message = ""; // Resets the message state to an empty string
        },
        clearHistory(state) {
            state.history = []; // Resets the message state to an empty string
        },

    },
});

// Exporting actions for use in components
export const { setMessage, addToHistory, clearMessage, clearHistory } = chatSlice.actions;
export default chatSlice.reducer; // Exporting the reducer to be used in the store
