import React, { useRef, useEffect } from 'react';
import configureStore from '../../store/configureStore';
import { useState } from 'react';
import { locationToAddress } from '@arcgis/core/rest/locator';
import { getMapView } from '../../store/reducers/mapViewReducer';
import { useSelector, useDispatch } from 'react-redux'
import mapView from '../../store/reducers/mapViewReducer';
import { addMapView } from "../../store/reducers/mapViewReducer";
export default function Search() {

    const store = configureStore(mapView.reducer);
    const dispatch = useDispatch();
    const view = useSelector(state => state.mapView)

    useEffect(() => {
        // dispatch(addMapView());
    }, [dispatch]);
    const inputRef = useRef(null);


    useEffect(() => {
        console.log('====================================');
        console.log("View is outside the If condition ", view);
        console.log('====================================');
        if (view == " ") {
            // Load the necessary ArcGIS modules
            console.log('====================================');
            console.log("View is created");
            console.log('====================================');
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
        }
    }, [view]);

    return (
        <div className="relative">
        </div>
    );
}
