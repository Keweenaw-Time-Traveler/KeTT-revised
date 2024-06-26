import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { timelinePickerUrl } from '../../assets/data/Apis/apis';
import axios from 'axios';
export const fetchTimelineData = createAsyncThunk(
    'timelinePicker/fetchTimelineData',
    async () => {
        try {
            const response = await axios.get(timelinePickerUrl);
            return response.data;
        } catch (error) {
            console.log('Failed to fetch timeline data');
            throw error;
        }
    }
);

const timelinePickerSlice = createSlice({
    name: 'timelinePicker',
    initialState: {
        loading: false,
        timelineData: null,
        error: null
    },
    reducers: {
        clearTimelineData: (state) => {
            state.timelineData = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTimelineData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTimelineData.fulfilled, (state, action) => {
            // console.log("Thunk Slice Log is ", action);
            state.loading = false;
            state.timelineData = action.payload.segments;
            // console.log("Updated timelineData is ", state.timelineData);
        });
        builder.addCase(fetchTimelineData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;

        });
    }
});

export const { clearTimelineData } = timelinePickerSlice.actions;

export default timelinePickerSlice.reducer;
