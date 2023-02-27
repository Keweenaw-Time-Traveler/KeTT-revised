import { createSlice } from "@reduxjs/toolkit";

export const ARC_GIS_MAP_LOADED = "arcgis/mapLoaded";
export const ARC_GIS_ADD_LAYER = "arcgis/addLayer";
export const ARC_GIS_ZOOM_TO_POINT = "arcgis/zoomToPoint";
export const ARC_GIS_SET_CENTER = "arcgis/setCenter";
export const ARC_GIS_MAP_UPDATED = "arcgis/mapUpdated";

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
