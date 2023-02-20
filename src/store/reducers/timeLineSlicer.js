import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTimelineData = createAsyncThunk(
    'timelinePicker/fetchTimelineData',
    async () => {
        const response = await fetch('https://geospatialresearch.mtu.edu/date_picker.php');
        if (!response.ok) {
            throw new Error('Failed to fetch timeline data');
        }
        return response.json();
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
            console.log("Thunk Slice Log is ", action);
            state.loading = false;
            state.timelineData = action.payload.segments;
            console.log("Updated timelineData is ", state.timelineData);
        });
        builder.addCase(fetchTimelineData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { clearTimelineData } = timelinePickerSlice.actions;

export default timelinePickerSlice.reducer;
