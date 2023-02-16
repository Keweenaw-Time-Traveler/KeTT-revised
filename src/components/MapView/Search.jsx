import React, { useRef, useEffect } from 'react';
import configureStore from '../../store/configureStore';
import { useState } from 'react';
import { locationToAddress } from '@arcgis/core/rest/locator';
import { getMapView } from '../../store/reducers/mapViewReducer';

export default function Search({ view }) {
    const inputRef = useRef(null);
    useEffect(() => {
        if (view) {
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
            <input
                type="text"
                className="w-full py-2 pl-10 pr-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Search..."
                ref={inputRef}
            />
            <div className="absolute top-0 left-0 pt-2 pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 3a5 5 0 017.97.7l3.33 3.32a1 1 0 01-1.42 1.42l-3.32-3.33A5 5 0 018 3zm0 2a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );
}
