import React, { useRef, useEffect } from 'react';
import { initializeMap } from './map';

function SearchInput({ onSearch }) {
    const inputRef = useRef(null);

    useEffect(() => {
        initializeMap('map').then(({ view }) => {
            // Load the necessary ArcGIS modules
            import('@arcgis/core/widgets/Search').then(({ default: Search }) => {
                // Create a new instance of the Search widget
                const search = new Search({
                    view: view,
                    includeDefaultSources: false,
                    sources: []
                });

                // Override the default template for the Search widget
                search.popupTemplate = {
                    title: '{name}',
                    content: '{address}'
                };

                // Add the Search widget to the map view's UI
                view.ui.add(search, 'top-right');

                // Handle the search event
                search.on('select-result', (event) => {
                    onSearch(event.result);
                });

                // Save a reference to the input element for styling
                inputRef.current = document.querySelector('.esri-search__input');
            });
        });
    }, []);

    return (
        <>
            <div id="map" className="h-96"></div>
            <div className="absolute top-0 left-0 z-10 w-full">
                <div className="relative">
                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-3 rounded-lg border-2 border-gray-200 text-gray-700 focus:outline-none focus:border-blue-500"
                        placeholder="Search..."
                        ref={inputRef}
                    />
                    <div className="absolute top-0 left-0 pl-3 pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 3a5 5 0 017.97.7l3.33 3.32a1 1 0 01-1.42 1.42l-3.32-3.33A5 5 0 018 3zm0 2a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}



