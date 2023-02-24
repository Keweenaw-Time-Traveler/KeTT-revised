import { createSlice } from "@reduxjs/toolkit";
import { defaultTimeLineMapURL } from '../../assets/data/Apis/apis';

const initialState = {
    timeline: {
        startDate: 'default',
        endDate: '',
        url: defaultTimeLineMapURL,
    },
    searchType: null,
};

const currentStateSlice = createSlice({
    name: "currentState",
    initialState,
    reducers: {
        setTimeline: (state, action) => {
            console.log("setTimeline() Log", action);
            state.timeline.startDate = action.payload.year;
            state.timeline.url = action.payload.url;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
    },
});

export const { setTimeline, setSearchType } = currentStateSlice.actions;
export default currentStateSlice.reducer;
