import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import WebMap from "@arcgis/core/WebMap";
import TileLayer from '@arcgis/core/layers/TileLayer'
import { locationToAddress } from '@arcgis/core/rest/locator'
import Locate from '@arcgis/core/widgets/Locate'
import Graphic from '@arcgis/core/Graphic'
import { SimpleMarkerSymbol } from '@arcgis/core/symbols'
import './styles.css'
import { addMapView } from "../../store/reducers/mapViewReducer";
import configureStore from "../../store/configureStore";
import Search from '@arcgis/core/widgets/Search';


function App() {

    const store = configureStore();
    const mapDiv = useRef(null);
    const inputRef = useRef(null);

    const [view, setView] = useState(null);
    const housingLayer = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
        id: "ny-housing",
        opacity: 0.9
    });
    const webmap = new WebMap({
        basemap: 'topo-vector',
        ground: 'world-elevation',
        portalItem: 'https://portal1-geo.sabu.mtu.edu/server/rest/services/KeweenawHSDI/KeTT_1928_FIPS/MapServer'
    });
    // webmap.add();

    useEffect(() => {
        const newView = new MapView({
            container: mapDiv.current,
            map: webmap,
            center: [-71.6899, 43.0598],
            zoom: 12,
            // ui: {
            //     components: [
            //     ]
            // }
        });
        store.dispatch(addMapView({ newView }))
    }, []);

    useEffect(() => {
        if (view) {
            view.on("layer-view-create", (event) => {
                if (event.layer.id === "ny-housing") {
                    console.log(
                        "LayerView for male population created!",
                        event.layerView
                    );
                }
                if (event.layer.id === "streets") {
                    // Explore the properties of the transportation layer's layer view here
                    console.log("LayerView for streets created!", event.layerView);
                }
            })

            view.when(() => {
                housingLayer.when(() => {
                    view.goTo(housingLayer.fullExtent).catch((error) => console.log(error))
                })
            })
            view.popup.autoOpenEnabled = false


            let locateWidget = new Locate({
                view: view,   // Attaches the Locate button to the view
                graphic: new Graphic({
                    symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
                    // graphic placed at the location of the user when found
                })
            });
            view.ui.add(locateWidget, "bottom-left")

            const searchWidget = new Search({
                view,
                container: 'searchInput'
            })
            searchWidget.popupTemplate = {
                title: '{name}',
                content: '{address}',
            };
            // view.ui.add(searchWidget, "top-left")

            searchWidget.on('select-result', (event) => {
                // onSearch(event.result);
                console.log('====================================');
                console.log(event.result);
                console.log('====================================');
            });
            inputRef.current = document.querySelector('.esri-search__input');

            const toggle = new BasemapToggle({
                // 2 - Set properties
                view: view, // view that provides access to the map's 'topo-vector' basemap
                nextBasemap: "hybrid" // allows for toggling to the 'hybrid' basemap
            });

            // Add widget to the top right corner of the view
            view.ui.add(toggle, "bottom-right");

            const markerSymbol = new SimpleMarkerSymbol({
                style: "circle",
                color: [255, 0, 0, 0.5],
                size: "20px",
                outline: {
                    color: [255, 255, 255],
                    width: 1
                }
            });

            const coordinates = [
                [-117.16, 32.71],
                [-118.15, 33.70],
                [-119.14, 34.69]
            ];

            const graphics = coordinates.map(coordinate => ({
                symbol: markerSymbol,
                geometry: {
                    type: "point",
                    longitude: coordinate[0],
                    latitude: coordinate[1]
                }
            }));

            view.graphics.addMany(graphics);
            // view.graphics.
            // view.graphics.add(graphics)
        }
    }, [view]);




    return (
        <div>

            {/* <SearchInput view={view} /> */}
            <div className="mapDiv" ref={mapDiv}>
            </div>

        </div>
    )
        ;
}

export default App;