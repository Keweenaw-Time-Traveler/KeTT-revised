import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mapView: null,
    basemap: null,
    layers: [],
    selectedFeature: null,
    searchResults: [],
    searchInProgress: false,
    searchError: null,
    zoomLevel: null,
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapView: (state, action) => {
            state.mapView = action.payload;
        },
        setBasemap: (state, action) => {
            state.basemap = action.payload;
        },
        setLayers: (state, action) => {
            state.layers = action.payload;
        },
        setSelectedFeature: (state, action) => {
            state.selectedFeature = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setSearchInProgress: (state, action) => {
            state.searchInProgress = action.payload;
        },
        setSearchError: (state, action) => {
            state.searchError = action.payload;
        },
        setZoomLevel: (state, action) => {
            state.zoomLevel = action.payload;
        },
    },
});

// Actions
export const { setMapView, setBasemap, setLayers, setSelectedFeature, setSearchResults, setSearchInProgress, setSearchError, setZoomLevel } = mapSlice.actions;

// Selectors
export const selectMapView = (state) => state.map.mapView;
export const selectBasemap = (state) => state.map.basemap;
export const selectLayers = (state) => state.map.layers;
export const selectSelectedFeature = (state) => state.map.selectedFeature;
export const selectSearchResults = (state) => state.map.searchResults;
export const selectSearchInProgress = (state) => state.map.searchInProgress;
export const selectSearchError = (state) => state.map.searchError;
export const selectZoomLevel = (state) => state.map.zoomLevel;

export default mapSlice.reducer;
