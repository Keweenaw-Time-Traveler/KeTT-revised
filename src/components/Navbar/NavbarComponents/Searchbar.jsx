import React, { useState, useEffect, useContext } from 'react';
import { Tiles } from "../index";
import { NavbarSearchIcon } from "../../../assets/icons/heroicons";
import { ExpandTilesIcon } from "../../../assets/icons/heroicons";
import { useDispatch, useSelector } from "react-redux";
import { setTilesView } from '../../../store/reducers/NavbarTilesSlice';
import { setSearchPlace } from "../../../store/actionCreators/ArcGisActionCreator";
import { Combobox } from "@headlessui/react";
import { RxCrossCircled } from "react-icons/rx";
import { setError } from "../../../store/reducers/errorsSlice";

const Searchbar = () => {
    const dispatch = useDispatch();
    const { tiles, setTiles } = useContext(Tiles);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [tilesView, setTilesView] = useState(true);
    const [Xbutton, setXbutton] = useState(false);

    useEffect(() => {
        if (search.length > 0) {
            // Fetch suggestions using ArcGIS API
            const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${search}&maxSuggestions=5&f=json`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setSuggestions(data.suggestions.map(suggestion => suggestion.text));
                })
                .catch(err => {
                    console.log("Error fetching suggestions: ", err);
                    dispatch(setError("Error fetching suggestions: "))
                });
        } else {
            setSuggestions([]);
        }
    }, [search, dispatch]);


    const handleSetPlace = (place) => {
        console.log("Called");
        setSearch(place);
        dispatch(setSearchPlace(place));
        setXbutton(false);
    }

    const handleSelectSuggestion = (suggestion) => {
        setSearch(suggestion);
        setSuggestions([]);
        setXbutton(true);
    }
    return (
        <div className="flex flex-wrap items-center w-full space-x-2 rounded-md justify-content md:w-auto ">
            <Combobox>
                <div className="relative w-full">
                    <div className="flex items-center p-2 bg-white rounded-md shadow-md sm:focus:ring-black focus:border-black">
                        {
                            Xbutton ?
                                <RxCrossCircled
                                    className={`w-5 h-5 ${Xbutton ? '' : 'hidden'}`}
                                    onClick={() => { handleSetPlace("") }}
                                    aria-hidden="true"
                                /> :
                                <NavbarSearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        }

                        <Combobox.Input
                            className="w-full border-none inputBox sm:text-sm sm:leading-5 focus:outline-none focus:ring-0 "
                            placeholder={"Search places"}
                            onChange={(e) => handleSelectSuggestion(e.target.value)}
                        />
                        <button className={`-pl-10 -ml-10  ml-[1px] md:hidden ${tiles ? 'rotate-0 border-l-2' : 'rotate-180 border-r-2'}`} onClick={() => setTiles(!tiles)}>
                            <ExpandTilesIcon className={`h-8 w-8 text-gray-500 bg-white rounded-full p-1 `} />
                        </button>
                    </div>
                    {search.length > 0 && (
                        <div className="flex">
                            <button
                                type="button"
                                onClick={handleSetPlace}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                            >

                            </button>

                        </div>
                    )}

                    <Combobox.Options
                        className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dropdown max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm sm:leading-5"
                    >
                        {suggestions.map((place) => (
                            <Combobox.Option
                                key={place}
                                value={place}
                                onClick={() => handleSetPlace(place)}
                                className="p-4 text-sm cursor-pointer hover:text-black-400 hover:shadow-sm hover:bg-slate-200"
                            >
                                {place}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </div>
            </Combobox>
        </div>
    )
}

export default Searchbar
