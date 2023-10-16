import React, { useState, useEffect, useContext } from 'react';
import { Tiles } from "../index";
import SearchbarInput from "./SearchbarComponents/SearchbarInput";
import SearchbarButton from "./SearchbarComponents/SearchbarButton";
import SearchResults from "./SearchbarComponents/SearchResults";
import { useDispatch } from "react-redux";
import { setSearchPlace } from "../../../store/actionCreators/ArcGisActionCreator";
import { Combobox } from "@headlessui/react";
import { setError } from "../../../store/reducers/errorsSlice";

const Searchbar = () => {
    const dispatch = useDispatch();
    const { tiles, setTiles } = useContext(Tiles);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
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
                    <SearchbarInput setPlace={handleSetPlace} Suggestion={handleSelectSuggestion} close={Xbutton} />
                    <SearchbarButton search={search} setPlace={handleSetPlace} />
                    <SearchResults results={suggestions} setPlace={handleSetPlace} />
                </div>
            </Combobox>
        </div>
    )
}

export default Searchbar
