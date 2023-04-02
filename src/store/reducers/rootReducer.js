import { combineReducers } from 'redux';
import mapViewReducer from './unusedReducers/mapViewReducer';
import mapSlice from './unusedReducers/mapSlice'
import timelineSlice from './timeLineSlicer';
import errorsSlice from './errorsSlice';
import currentState from './unusedReducers/currentState';
import arcgisReducer from './unusedReducers/ArcGisReducer';

export default combineReducers({
    // mapView: mapViewReducer.reducer,
    // mapSlice: mapSlice,
    timeline: timelineSlice,
    errors: errorsSlice,
    // currentState: currentState,
    arcgisState: arcgisReducer,
})