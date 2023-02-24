import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'mapViewReducer',
    initialState: {
        value: null
    },
    reducers: {
        addMapView: (mapView, action) => {
            console.log("Action call is ", action)
            mapView.value = action.payload.newView
        },
        updateMapView: (mapView, action) => {
            mapView.value = action.payload.mapView
        },
        getMapView: (mapView, action) => {
            mapView.value = ''
        },
        resetMapView: (mapView, action) => {
            mapView.value = null
        },
    }
})
// console.log(slice)

export const { addMapView, updateMapView, resetMapView, getMapView } = slice.actions;
export default slice;
