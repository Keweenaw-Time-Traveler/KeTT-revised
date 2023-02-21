import { combineReducers } from 'redux';
import mapViewReducer from './mapViewReducer';
import mapSlice from './mapSlice'
import timelineSlice from './timeLineSlicer';


export default combineReducers({
    mapView: mapViewReducer.reducer,
    mapSlice: mapSlice,
    timeline: timelineSlice
})