import Graphic from "@arcgis/core/Graphic";
import TileLayer from "@arcgis/core/layers/TileLayer";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import Locate from "@arcgis/core/widgets/Locate";
import { Point } from "@arcgis/core/geometry";
import ReactDOM from 'react-dom/client';


import {
  INIT_SCENE,
  SET_CENTER,
  SET_PLACE,
  SET_PORTAL_URL,
  FETCH_DATA_POINTS,
  scrollAction,
} from "../actionCreators/ArcGisActionCreator";

import { selectedTimeline } from "../reducers/timelineSlice";
import PopupContent from "../../components/PopupContent";
// Global variable for ArcGIS objects
const arcgis = window.arcgis || {};


// Middleware
export const webMap = (store) => (next) => (action) => {
  const { arcgisState } = store.getState();


  switch (action.type) {
    case INIT_SCENE: {
      if (!action.id || !action.container) break;
      if (arcgis.container) {
        action.container.appendChild(arcgis.container);
        break;
      }
      arcgis.container = document.createElement("DIV");
      action.container.appendChild(arcgis.container);
      // arcgis = { ...arcgis, center: 35 }
      arcgis.mapView = new MapView({
        container: arcgis.container,
        center: arcgisState.center,
        zoom: arcgisState.zoom,
        ui: {
          components: [],
        },
      });
      const webMap = new WebMap({
        basemap: "topo-vector",
      });
      arcgis.mapView.map = webMap;
      const locateWidget = new Locate({
        view: arcgis.mapView,
        graphic: new Graphic({
          symbol: { type: "simple-marker" },
        }),
      });
      arcgis.mapView.ui.add(locateWidget, "bottom-left");
      const toggle = new BasemapToggle({
        view: arcgis.mapView,
        nextBasemap: "hybrid",
      });
      arcgis.mapView.ui.add(toggle, "bottom-right");
      const housingLayer = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
        id: "ny-housing",
        opacity: 0.9,
      });
      webMap.add(housingLayer);
      // To-Do About Implementation
      // Promise.resolve(webMap)
      //     .then(() => {
      //         webMap.layers.items.forEach((layer) => { layer.popupEnabled = false; });
      //         return arcgis.mapView.whenLayerView(webMap.layers.getItemAt(0));
      //     })
      break;
    }
    case SET_CENTER: {
      if (arcgis.mapView) {
        arcgis.mapView
          .goTo(
            {
              zoom: 7,
            },
            {
              duration: 2000,
            }
          )
          .then(() => {
            const center = new Point(arcgisState.center);
            arcgis.mapView.goTo(
              {
                center,
                zoom: 14,
              },
              {
                duration: 3000,
              }
            );
          });
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
        opacity: 0.7,
      });
      const webMap = arcgis.mapView.map;
      webMap.removeAll();
      webMap.add(layer);
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
      });

      layer
        .when(() => {
          console.log("Inside the Layer view Created");
          webMap.layers.items.forEach((layer) => {
            layer.popupEnabled = false;
          });

          const layerView = arcgis.mapView.whenLayerView(layer);
          return layerView.then(() => {
            console.log("Layer has been loaded successfully");
            // Do any additional actions after the layer view has been created
          });
        })
        .catch((error) => {
          console.log("====================================");
          console.log("Error in Layer creation", error);
          console.log("====================================");
        });
      // store.dispatch(selectedTimeline({ map_year, url: url, startDate: min, endDate: max }))
      next(action);
      break;
    }
    case SET_PLACE: {
      console.log("Action is ", action);
      if (arcgis.mapView) {
        const geocodeUrl =
          "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates";
        const { place } = action;

        const params = {
          f: "json",
          singleLine: place,
          outFields: "Match_addr, stAddr, City",
        };

        fetch(`${geocodeUrl}?${new URLSearchParams(params)}`)
          .then((response) => response.json())
          .then((result) => {
            if (result.candidates.length > 0) {
              const [firstCandidate] = result.candidates;
              const { location } = firstCandidate;
              console.log("Location is ", location);
              const center = new Point(location.x, location.y);
              arcgis.mapView
                .goTo(
                  {
                    zoom: 7,
                  },
                  {
                    duration: 2000,
                  }
                )
                .then(() => {
                  arcgis.mapView
                    .goTo(
                      {
                        target: center,
                        zoom: 12,
                      },
                      {
                        duration: 2000,
                      }
                    )
                    .then(() => {
                      const popupTemplate = {
                        title: `{Match_addr}`,
                        content: `Street Address: {stAddr}<br>City: {City}`,
                      };

                      const graphic = new Graphic({
                        geometry: center,
                        symbol: {
                          type: "simple-marker",
                          color: "blue",
                          size: "15px",
                          outline: {
                            color: [255, 255, 255],
                            width: "2px",
                          },
                        },
                        attributes: {
                          Match_addr: firstCandidate.attributes.Match_addr,
                          stAddr: firstCandidate.attributes.stAddr,
                          City: firstCandidate.attributes.City,
                        },
                        popupTemplate,
                      });

                      arcgis.mapView.graphics.removeAll();
                      arcgis.mapView.graphics.add(graphic);
                    });
                });
            }
          })
          .catch((error) =>
            console.log("Error fetching geocoding result", error)
          );
      }
      break;
    }
    case FETCH_DATA_POINTS: {
      if (arcgis.mapView) {
        const apiRequest = {
          search: "",
          filters: {
            date_range: "1850-2023",
            featured: "false",
            photos: "false",
            type: "everything",
          },
          size: 1,
        };

        fetch("http://localhost:8888/ktt-api/grid.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequest),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the API response data and add data points to the map.
            if (data.active && data.active.results) {
              const dataPoints = data.active.results;
              console.log("API response data:", data);
              const graphics = dataPoints.map((item) => {
                const lon = item.centroid.lon;
                const lat = item.centroid.lat;
                const id=item.id;

                const point = new Point({
                  x: lon,
                  y: lat,
                  spatialReference: arcgis.mapView.spatialReference,
                });

                const graphic = new Graphic({
                  geometry: point,
                  symbol: {
                    type: "simple-marker",
                    color: "red",
                    size: "10px",
                  },
                  attributes: {
                    title: item.title,
                    id
                    // Add more attributes if needed
                  },
                });

                return graphic;
              });

              arcgis.mapView.graphics.removeAll();
              arcgis.mapView.graphics.addMany(graphics);

              arcgis.mapView.on("click", (event) => {
                arcgis.mapView.hitTest(event).then((response) => {
                  const graphic = response.results[0]?.graphic;
                  if (graphic) {
                    const attributes = graphic.attributes;
                    const pointId = attributes.id;

                    // Create a popup template with the custom content
                    const popupTemplate = {
                      title: attributes.title,
                      content: function () {
                        // Create a DOM element to render your React component into
                        const container = document.createElement("div");
                        container.setAttribute("id", "popup-content");
                        // Render your React component into the container
                        const root = ReactDOM.createRoot(container);
                        root.render(<PopupContent pointId={pointId} />);
                        // Return the container as the popup content
                        return container;
                      },
                    };
                    
                    graphic.popupTemplate = popupTemplate;
                    arcgis.mapView.popup.open({
                      features: [graphic],
                      location: event.mapPoint,
                    });
                  }
                });
              });
            }
          })
          .catch((error) => {
            console.error("Error fetching data from the API:", error);
          });
      }
      break;
    }
    default:
      next(action);
  }
};