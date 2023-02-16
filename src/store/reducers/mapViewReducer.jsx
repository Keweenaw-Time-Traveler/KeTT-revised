import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'mapViewReducer',
    initialState: [],
    reducers: {
        addMapView: (mapView, action) => {
            console.log("Action call is ", action)
            mapView[0] = action.payload.newView
        },
        updateMapView: (mapView, action) => {
            mapView[0] = action.payload.mapView
        },
        getMapView: (mapView, action) => {
            mapView[1] = ''
        },
        resetMapView: (mapView, action) => {
            mapView[0] = null
        },
    }
})
// console.log(slice)

export const { addMapView, updateMapView, resetMapView, getMapView } = slice.actions;
export default slice.reducer;
