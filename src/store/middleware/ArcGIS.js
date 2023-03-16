import Graphic from '@arcgis/core/Graphic';
import TileLayer from '@arcgis/core/layers/TileLayer';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Locate from '@arcgis/core/widgets/Locate';
import { Point } from '@arcgis/core/geometry'
import { INIT_SCENE, SET_CENTER, SET_PORTAL_URL } from './ArcGisActionCreator';


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
                    zoom: arcgisState.zoom,
                    ui: {
                        components: []
                    }
                }
            );

            // registerClickEvent(arcgis.mapView, store);

            // Initialize web scene
            const webScene = new WebMap(
                {
                    basemap: 'topo-vector',
                    // ground: 'world-elevation',
                    // portalItem: 'https://portal1-geo.sabu.mtu.edu/server/rest/services/KeweenawHSDI/KeTT_1928_FIPS/MapServer'
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

                    // next({ ...action, name: webScene.portalItem.title });

                    return arcgis.mapView.whenLayerView(webScene.layers.getItemAt(0));
                })
        };
        case SET_CENTER: {

            if (arcgis.mapView) {


                arcgis.mapView.goTo({
                    zoom: 7
                }, {
                    duration: 2000
                }).then(() => {
                    const center = new Point(arcgisState.center)
                    arcgis.mapView.goTo({
                        center,
                        zoom: 14
                    }, {
                        duration: 3000
                    })

                })

            }
            break;
        }
        case SET_PORTAL_URL: {
            if (!arcgis.mapView) break;

            console.log("Layering Started Called");
            const layer = new TileLayer({
                id: "Timeline-Layer",
                url: action.url,
                opacity: 0.7
            });

            const transportationLayer = new TileLayer({
                url: "https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer",
                id: "streets",
                opacity: 0.7
            });

            const webMap = arcgis.mapView.map;
            webMap.removeAll();
            webMap.add(layer)
            // webMap.add(transportationLayer);

            webMap.on("layer-view-create", (event) => {
                console.log("Inside the Layer view Created");
                if (event.layer.id === "Timeline-Layer") {
                    console.log(
                        "LayerView for Timeline is population created!",
                        event.layerView
                    );
                }
                if (event.layer.id === "streets") {
                    // Explore the properties of the transportation layer's layer view here
                    console.log("LayerView for streets created!", event.layerView);
                }
            })

            layer.when(() => {
                console.log("Inside the Layer view Created");
                webMap.layers.items.forEach((layer) => { layer.popupEnabled = false; });

                const layerView = arcgis.mapView.whenLayerView(layer);
                return layerView.then(() => {

                    console.log("Layer has been loaded successfully");
                    // Do any additional actions after the layer view has been created
                });
            }).catch((error) => {
                console.log('====================================');
                console.log("Error in Layer creation", error);
                console.log('====================================');
            });

            break;
        }

        default:
            return next(action);
    }
};
