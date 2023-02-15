import { loadModules } from '@esri/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export async function initializeMap(mapDiv) {
    // Load the necessary ArcGIS modules
    const [Map, MapView] = await loadModules([
        'esri/Map',
        'esri/views/MapView'
    ]);

    // Create a new instance of the Map
    const map = new Map({
        basemap: 'streets-navigation-vector'
    });

    // Create a new instance of the MapView and set it to the mapDiv
    const view = new MapView({
        map: map,
        container: mapDiv,
        center: [-118.805, 34.027],
        zoom: 13
    });

    return { map, view };
}