import { combineReducers } from 'redux';
import mapViewReducer from './mapViewReducer';
import mapSlice from './mapSlice'
import timelineSlice from './timeLineSlicer';


export default combineReducers({
    mapView: mapViewReducer.reducer,
    // mapSlice: ma pSlice,
    timeline: timelineSlice
})