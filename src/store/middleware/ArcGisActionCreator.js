export const INIT_SCENE = "INIT_SCENE"
export const SET_CENTER = "SET_CENTER"
export const SET_PORTAL_URL = "SET_PORTAL_URL"


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
