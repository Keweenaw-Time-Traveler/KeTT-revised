import Graphic from '@arcgis/core/Graphic';
import TileLayer from '@arcgis/core/layers/TileLayer';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import Locate from '@arcgis/core/widgets/Locate';
import { Point } from '@arcgis/core/geometry'
import { INIT_SCENE, SET_CENTER, SET_PORTAL_URL } from '../actionCreators/ArcGisActionCreator';
import { selectedTimeline } from '../reducers/timeLineSlicer';

// Global variable for ArcGIS objects
const arcgis = window.arcgis || {};

// Middleware
export const arcGisMiddleware = store => (next) => (action) => {
    const { arcgisState } = store.getState();
    switch (action.type) {
        case INIT_SCENE: {
            if (!action.id || !action.container) break;
            if (arcgis.container) {
                action.container.appendChild(arcgis.container);
                break;
            }
            arcgis.container = document.createElement('DIV');
            action.container.appendChild(arcgis.container);
            // arcgis = { ...arcgis, center: 35 }
            arcgis.mapView = new MapView({
                container: arcgis.container,
                center: arcgisState.center,
                zoom: arcgisState.zoom,
                ui: {
                    components: []
                }
            });
            const webMap = new WebMap({
                basemap: 'topo-vector'
            });
            arcgis.mapView.map = webMap;
            const locateWidget = new Locate({
                view: arcgis.mapView,
                graphic: new Graphic({
                    symbol: { type: "simple-marker" }
                })
            });
            arcgis.mapView.ui.add(locateWidget, "bottom-left")
            const toggle = new BasemapToggle({
                view: arcgis.mapView,
                nextBasemap: "hybrid"
            });
            arcgis.mapView.ui.add(toggle, "bottom-right");
            const housingLayer = new TileLayer({
                url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
                id: "ny-housing",
                opacity: 0.9
            });
            webMap.add(housingLayer)
            // To-Do About Implementation
            // Promise.resolve(webMap)
            //     .then(() => {
            //         webMap.layers.items.forEach((layer) => { layer.popupEnabled = false; });
            //         return arcgis.mapView.whenLayerView(webMap.layers.getItemAt(0));
            //     })
            break;
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
            const { url } = action.payload;
            console.log("Action state in Portal is ", action, "Url is", url);
            if (!arcgis.mapView) break;
            const layer = new TileLayer({
                id: "Timeline-Layer",
                url: url,
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
            // store.dispatch(selectedTimeline({ map_year, url: url, startDate: min, endDate: max }))
            next(action);
            break;
        }

        default:
            next(action);
    }
};


