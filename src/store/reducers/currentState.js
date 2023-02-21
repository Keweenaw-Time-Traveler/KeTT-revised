import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeline: {
        startDate: null,
        endDate: null,
        range: null,
    },
    searchType: null,
};

const currentStateSlice = createSlice({
    name: "currentState",
    initialState,
    reducers: {
        setTimeline: (state, action) => {
            state.timeline = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
    },
});

export const { setTimeline, setSearchType } = currentStateSlice.actions;
export default currentStateSlice.reducer;
