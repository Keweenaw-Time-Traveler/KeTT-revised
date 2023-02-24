import { createSlice } from "@reduxjs/toolkit";

export const ARC_GIS_MAP_LOADED = "arcgis/mapLoaded";
export const ARC_GIS_ADD_LAYER = "arcgis/addLayer";
export const ARC_GIS_ZOOM_TO_POINT = "arcgis/zoomToPoint";
export const ARC_GIS_SET_CENTER = "arcgis/setCenter";
export const ARC_GIS_MAP_UPDATED = "arcgis/mapUpdated";

const initialState = {
    mapId: "",
    map: "null",
    view: "null",
};

const arcgisSlice = createSlice({
    name: "arcgis",
    initialState,
    reducers: {
        arcGisLoadMap: (state, action) => {
            state.mapId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ARC_GIS_MAP_LOADED, (state, action) => {
                const { map, view } = action.payload;
                state.map = map;
                state.view = view;
            })
            .addCase(ARC_GIS_ADD_LAYER, (state, action) => {
                const { map } = state;
                const { payload: layer } = action;
                if (map && layer) {
                    map.add(layer);
                }
            })
            .addCase(ARC_GIS_ZOOM_TO_POINT, (state, action) => {
                const { view } = state;
                const { payload: point } = action;
                if (view && point) {
                    view.goTo({
                        target: point,
                        zoom: 15,
                    });
                }
            })
            .addCase(ARC_GIS_MAP_UPDATED, (state, action) => {
                const { map, view } = action.payload;
                state.map = map;
                state.view = view;
            });
    },
});

export default arcgisSlice.reducer;
