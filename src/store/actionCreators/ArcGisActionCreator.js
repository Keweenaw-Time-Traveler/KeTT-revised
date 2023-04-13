export const INIT_SCENE = "INIT_SCENE"
export const SET_CENTER = "SET_CENTER"
export const SET_PORTAL_URL = "timelinePicker/selectedTimeline"
export const SET_PLACE = "SET_PLACE"


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