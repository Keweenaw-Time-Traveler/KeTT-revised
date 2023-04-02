import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { timelinePickerUrl } from '../../assets/data/Apis/apis';
import { defaultTimeLineMapURL } from '../../assets/data/Apis/apis';
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

const initialState = {
    loading: false,
    timelineData: null,
    error: null,
    selectedTime: {
        map_year: 'default',
        startDate: 1850,
        endDate: 1894,
        url: defaultTimeLineMapURL,
    }
}

const timelinePickerSlice = createSlice({
    name: 'timelinePicker',
    initialState,
    reducers: {
        clearTimelineData: (state) => {
            state.timelineData = null;
        },
        setTimeline: (state, { payload }) => {
            // console.log("action is Timeline is", payload);
            state.timeline = {
                ...state.timeline,
                map_year: payload.year,
                url: payload.url ?? defaultTimeLineMapURL,
                startDate: payload.startDate,
                endDate: payload.endDate,
            };
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

export const { setTimeline, clearTimelineData } = timelinePickerSlice.actions;

export default timelinePickerSlice.reducer;
