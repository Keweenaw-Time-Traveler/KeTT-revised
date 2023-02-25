
import Graphic from '@arcgis/core/Graphic';
import TileLayer from '@arcgis/core/layers/TileLayer';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Locate from '@arcgis/core/widgets/Locate';



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


    const { arcgisState } = store.getState();
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
            arcgis.mapView = new MapView(
                {
                    container: arcgis.container,
                    center: arcgisState.center,
                    zoom: arcgisState.zoom
                }
            );

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

            let locateWidget = new Locate({
                view: arcgis.mapView,   // Attaches the Locate button to the view
                graphic: new Graphic({
                    symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
                    // graphic placed at the location of the user when found
                })
            });
            arcgis.mapView.ui.add(locateWidget, "bottom-left")

            const toggle = new BasemapToggle({
                // 2 - Set properties
                view: arcgis.mapView, // view that provides access to the map's 'topo-vector' basemap
                nextBasemap: "hybrid", // allows for toggling to the 'hybrid' basemap

            });

            // Add widget to the top right corner of the view
            arcgis.mapView.ui.add(toggle, "bottom-right");


            const housingLayer = new TileLayer({
                url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
                id: "ny-housing",
                opacity: 0.9
            });

            webScene.add(housingLayer)
            // When initialized...
            return Promise.resolve(webScene)
                .then(() => {
                    webScene.layers.items.forEach((layer) => { layer.popupEnabled = false; });

                    next({ ...action, name: webScene.portalItem.title });

                    return arcgis.mapView.whenLayerView(webScene.layers.getItemAt(0));
                })
        };
        case SET_CENTER: {

            console.log();
            if (arcgis.mapView) {
                arcgis.mapView.center = arcgisState.center;
            }

            break;
        }
        default:
            return next(action);
    }
};
