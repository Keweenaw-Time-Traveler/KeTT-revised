import { createSlice } from "@reduxjs/toolkit";
import { defaultTimeLineMapURL } from '../../assets/data/Apis/apis';

const initialState = {
    timeline: {
        map_year: 'default',
        startDate: 1850,
        endDate: 1894,
        url: defaultTimeLineMapURL,
    },
    searchType: null,
};

const currentStateSlice = createSlice({
    name: "currentState",
    initialState,
    reducers: {
        setTimeline: (state, { payload }) => {
            // console.log("action is Timeline is", payload);
            state.timeline = {
                ...state.timeline,
                map_year: payload.year,
                url: payload.url ?? defaultTimeLineMapURL,
                startDate: payload.startDate,
                endDate: payload.endDate,
            };
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
    },
});

export const { setTimeline, setSearchType } = currentStateSlice.actions;
export default currentStateSlice.reducer;
