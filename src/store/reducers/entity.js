import { combineReducers } from 'redux';
import mapViewReducer from './mapViewReducer';


export default combineReducers({
    mapView: mapViewReducer,
})