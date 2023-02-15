import React, { useRef, useEffect } from 'react';

export default function SearchInput({ onSearch, view }) {
    const inputRef = useRef(null);

    useEffect(() => {
        // Load the necessary ArcGIS modules
        window.require([
            'esri/widgets/Search'
        ], (Search) => {
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

            view.ui.add(search, 'top-right');

            // Handle the search event
            search.on('select-result', (event) => {
                onSearch(event.result);
            });

            // Save a reference to the input element for styling
            inputRef.current = document.querySelector('.esri-search__input');
        });
    }, []);

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
