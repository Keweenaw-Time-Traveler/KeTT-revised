export const INIT_SCENE = "INIT_SCENE"
export const SET_CENTER = "SET_CENTER"
export const SET_PORTAL_URL = "timelinePicker/selectedTimeline"
export const SET_PLACE = "SET_PLACE"
export const SET_PAGE = "SET_PAGE"
export const SET_GRID = "SET_GRID"
export const FETCH_DATA_POINTS = 'FETCH_DATA_POINTS';

export const initMap = (id, container) => ({
    type: INIT_SCENE,
    id,
    container
});

export const setCenter = (center) => ({
    type: SET_CENTER,
    center
})


export const setPortalURl = (url) => ({
    type: SET_PORTAL_URL,
    url
})

export const setSearchPlace = (place) => ({
    type: SET_PLACE,
    place
})

export const fetchDataPoints = (dataPoints) => ({
    type: FETCH_DATA_POINTS,
    dataPoints
})
// src/actionCreators/ScrollActionCreator.js

export const SCROLL = "SCROLL";

export const scrollAction = () => ({
  type: SCROLL,
});
