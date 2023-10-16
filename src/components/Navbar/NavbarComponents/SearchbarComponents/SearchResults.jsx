import React from 'react';
import { Combobox } from "@headlessui/react";

const SearchResults = ({ results, setPlace }) => {
    return (
        <div>
            <Combobox.Options
                className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg 
                dropdown max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm sm:leading-5">
                {results.map((place) => (
                    <Combobox.Option
                        key={place}
                        value={place}
                        onClick={() => setPlace(place)}
                        className="p-4 text-sm cursor-pointer hover:text-black-400 hover:shadow-sm hover:bg-slate-200"
                    >
                        {place}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </div>
    )
}

export default SearchResults
