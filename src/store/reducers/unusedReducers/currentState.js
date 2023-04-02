import { createSlice } from "@reduxjs/toolkit";
import { defaultTimeLineMapURL } from '../../../assets/data/Apis/apis';

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
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
    },
});

export const { setSearchType } = currentStateSlice.actions;
export default currentStateSlice.reducer;
