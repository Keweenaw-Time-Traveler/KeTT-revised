import React, { useState, useEffect, useContext } from "react";
import WebTimeline from "./NavbarComponents/WebTimeline";
import NavbarTiles from "./NavbarComponents/NavbarTiles";
import Searchbar from "./NavbarComponents/Searchbar";
import { NavbarSearchIcon } from "../../assets/icons/heroicons";
import { ExpandTilesIcon } from "../../assets/icons/heroicons";
import { useDispatch } from "react-redux";
import { setSearchPlace } from "../../store/actionCreators/ArcGisActionCreator";
import { Combobox } from "@headlessui/react";
import { RxCrossCircled } from "react-icons/rx";
import { setError } from "../../store/reducers/errorsSlice";

export const Tiles = React.createContext({ tiles: true, setTiles: () => { } });
export default function Index() {

    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [tiles, setTiles] = useState(true);
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
        <header className="text-gray-600 body-font">
            <div className="p-5 flex justify-center w-[100vw] flex-col items-center md:flex-row space-y-6 md:space-y-0">
                <Tiles.Provider value={{ tiles, setTiles }}>

                    <Searchbar />
                    <NavbarTiles />

                </Tiles.Provider>

                <WebTimeline />

            </div>
        </header>
    );
}