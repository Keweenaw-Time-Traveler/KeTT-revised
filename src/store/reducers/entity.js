import { combineReducers } from 'redux';
import mapViewReducer from './mapViewReducer';
import mapSlice from './mapSlice'
import timelineSlice from './timeLineSlicer';
import errorsSlice from './errorsSlice';
import currentState from './currentState';
import arcgisReducer from './ArcGisReducer';

export default combineReducers({
    mapView: mapViewReducer.reducer,
    mapSlice: mapSlice,
    timeline: timelineSlice,
    errors: errorsSlice,
    currentState: currentState,
    arcgis: arcgisReducer,
})