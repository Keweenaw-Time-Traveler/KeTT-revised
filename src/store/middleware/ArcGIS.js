
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';



export const INIT_SCENE = "INIT_SCENE"

export const SET_CENTER = "SET_CENTER"



export const initMap = (id, container) => ({
    type: INIT_SCENE,
    id,
    container
});

export const setCenter = (center) => ({
    type: SET_CENTER,
    center
})

// Global variable for ArcGIS objects
const arcgis = window.arcgis || {};

// Middleware
export const arcGisMiddleware = store => (next) => (action) => {
    switch (action.type) {
        case INIT_SCENE: {
            if (!action.id || !action.container) break;

            // if mapView container is already initialized, just add it back to the DOM.
            if (arcgis.container) {
                action.container.appendChild(arcgis.container);
                break;
            }

            // Otherwise, create a new container element and a new scene view.
            arcgis.container = document.createElement('DIV');
            action.container.appendChild(arcgis.container);
            arcgis.mapView = new MapView({ container: arcgis.container });

            // registerClickEvent(arcgis.mapView, store);

            // Initialize web scene
            const webScene = new WebMap(
                {
                    basemap: 'topo-vector',
                    ground: 'world-elevation',
                    portalItem: 'https://portal1-geo.sabu.mtu.edu/server/rest/services/KeweenawHSDI/KeTT_1928_FIPS/MapServer'
                }
            );
            arcgis.mapView.map = webScene;

            // When initialized...
            return Promise.resolve(webScene)
                .then(() => {
                    webScene.layers.items.forEach((layer) => { layer.popupEnabled = false; });

                    // next({ ...action, name: webScene.portalItem.title });

                    // return arcgis.mapView.whenLayerView(webScene.layers.getItemAt(0));
                })
            // .then(() => {
            //     // Update the environment settings (either from the state or from the scene)
            //     const webSceneEnvironment = arcgis.mapView.map.initialViewProperties.environment;
            //     const date = new Date(webSceneEnvironment.lighting.date);
            //     date.setUTCHours(date.getUTCHours() + webSceneEnvironment.lighting.displayUTCOffset);

            //     const { environment } = store.getState();

            //     store.dispatch({
            //         // type: SET_ENVIRONMENT,
            //         date: environment.date !== null ? environment.date : date,
            //         UTCOffset: webSceneEnvironment.lighting.displayUTCOffset,
            //         shadows: environment.shadows !== null ?
            //             environment.shadows :
            //             webSceneEnvironment.lighting.directShadowsEnabled,
            //     });
            // });
        };
        case SET_CENTER: {
            const { center } = action;

            if (arcgis.mapView) {
                arcgis.mapView.center = center;
            }

            break;
        }
        default:
            return next(action);
    }
};
