import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
    name: 'error',
    initialState: null,
    reducers: {
        setError: (state, action) => {
            return action.payload;
        },
        removeError: (state, action) => {
            return null
        }
    },
});

export const { setError, removeError } = errorSlice.actions;

export default errorSlice.reducer;
