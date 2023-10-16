import React, { useContext } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { Tiles } from "../../index";
import { NavbarSearchIcon } from "../../../../assets/icons/heroicons";
import { ExpandTilesIcon } from "../../../../assets/icons/heroicons";
import { Combobox } from "@headlessui/react";


const SearchbarInput = ({ setPlace, Suggestion, close }) => {
    const { tiles, setTiles } = useContext(Tiles);
    return (
        <div className="flex items-center p-2 bg-white rounded-md shadow-md sm:focus:ring-black focus:border-black">
            {
                close ?
                    <RxCrossCircled
                        className={`w-5 h-5 ${close ? '' : 'hidden'}`}
                        onClick={() => { setPlace("") }}
                        aria-hidden="true"
                    /> :
                    <NavbarSearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            }

            <Combobox.Input
                className="w-full border-none inputBox sm:text-sm sm:leading-5 focus:outline-none focus:ring-0 "
                placeholder={"Search places"}
                onChange={(e) => Suggestion(e.target.value)}
            />
            <button className={`-pl-10 -ml-10  ml-[1px] md:hidden ${tiles ? 'rotate-0 border-l-2' : 'rotate-180 border-r-2'}`} onClick={() => setTiles(!tiles)}>
                <ExpandTilesIcon className={`h-8 w-8 text-gray-500 bg-white rounded-full p-1 `} />
            </button>
        </div>
    )
}

export default SearchbarInput
