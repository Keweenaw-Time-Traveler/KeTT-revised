import React from 'react';
import { useEffect, useState } from 'react';

const Timeline = () => {
    const [items, setItems] = useState([]);
    const [close, setClose] = useState(true);
    useEffect(() => {
        fetch("https://geospatialresearch.mtu.edu/date_picker.php")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.segments);
                    setItems(result.segments);
                })
    }, [])

    return (
        <div class="relative text-left">
            <select className="flex justify-center p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" role="menuitem" tabindex="-1" id="menu-item-1">Timeline
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </option>
                {items.map((item, i) => (
                    <option key={i} class="text-gray-700 block px-4 py-2 text-sm" tabIndex="1" id="menu-item-1">Keweenaw {item.min} - {item.max}</option>
                ))}
            </select>
        </div >
    )
}

export default Timeline;
