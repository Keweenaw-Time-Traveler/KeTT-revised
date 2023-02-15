import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import WebMap from "@arcgis/core/WebMap";
import TileLayer from '@arcgis/core/layers/TileLayer'
import { locationToAddress } from '@arcgis/core/rest/locator'
import Locate from '@arcgis/core/widgets/Locate'
import Search from '@arcgis/core/widgets/Search'
import Graphic from '@arcgis/core/Graphic'
import { SimpleMarkerSymbol } from '@arcgis/core/symbols'
import './styles.css'



function App() {

    const mapDiv = useRef(null);
    const inputRef = useRef(null);

    const [view, setView] = useState(null);
    const transportationLayer = new TileLayer({
        url: "https://server.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer",
        // This property can be used to uniquely identify the layer
        id: "streets",
        visible: false
    })
    const housingLayer = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
        id: "ny-housing",
        opacity: 0.9
    });
    const webmap = new WebMap({
        basemap: 'topo-vector',
        ground: 'world-elevation',
        layers: [transportationLayer]
    });
    webmap.add(housingLayer);

    useEffect(() => {
        const newView = new MapView({
            container: mapDiv.current,
            map: webmap,
            center: [-71.6899, 43.0598],
            zoom: 12
        });
        setView(newView);
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
            view.on('click', (event) => {
                const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

                const params = {
                    location: event.mapPoint
                };
                // console.log(event)
                locationToAddress("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer", params).then((res) => {
                    console.log("Location result is ", res.address)
                    view.popup.content = res.address
                }).catch(() => {
                    // If the promise fails and no result is found, show a generic message
                    view.popup.content = "No address was found for this location";
                });
                view.popup.open({
                    // Set the popup's title to the coordinates of the clicked location
                    title: "Reverse geocode: [" + lon + ", " + lat + "]",
                    location: event.mapPoint // Set the location of the popup to the clicked location
                });

            })


            let locateWidget = new Locate({
                view: view,   // Attaches the Locate button to the view
                graphic: new Graphic({
                    symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
                    // graphic placed at the location of the user when found
                })
            });
            view.ui.add(locateWidget, "bottom-left")

            const searchWidget = new Search({
                view
            })
            searchWidget.popupTemplate = {
                title: '{name}',
                content: '{address}'
            };
            view.ui.add(searchWidget, "top-left")

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


    const handleStreetLayerToggle = e => {
        transportationLayer.visible = e.target.checked;
    };


    return (
        <div>
            <div className="mapDiv" ref={mapDiv}>
                <div id="basemapGalleryDiv"></div>
                <span id="layerToggle" className="esri-widget">
                    <input type="checkbox" id="streetsLayer" onChange={handleStreetLayerToggle} /> Transportation
                </span>
            </div>

        </div>
    )
        ;
}

export default App;