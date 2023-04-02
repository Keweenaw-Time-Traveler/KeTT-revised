import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mapId: "",
    center: [- 88.5369, 47.1127],
    zoom: 10
};

const arcgisSlice = createSlice({
    name: "arcgis",
    initialState,
    reducers: {
        arcGisLoadMap: (state, action) => {
            state.mapId = action.payload;
        },
    },
});

export default arcgisSlice.reducer;
