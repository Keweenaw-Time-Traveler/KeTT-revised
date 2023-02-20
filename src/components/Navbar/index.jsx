import React from "react";
import Timeline from "../Timeline/timeline";
import NavbarData from '../../assets/data/Navbar/Tiles.json'
import { NavbarSearchIcon } from "../../assets/icons/heroicons";

export default function Index() {
    return (
        <header className="text-gray-600 body-font">
            <div className=" p-5  flex justify-center w-[100vw] flex-col items-center md:flex-row space-y-6 md:space-y-0">
                <div className="flex flex-wrap items-center w-full space-x-2 rounded-md justify-content md:w-auto ">
                    <div className="relative w-full mt-1 rounded-md shadow-lg ">
                        <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                            <NavbarSearchIcon className="w-5 h-6 text-gray-400" />
                        </div>
                        <input className="inputBox" id="searchInput" type="text" placeholder="Search ..." />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center pl-4 mx-auto text-base  md:border-l md:border-gray-400 lg:mr-auto lg:ml-4">
                    {NavbarData.Tiles.map((item) => (
                        <button className="p-1 px-4 mr-5 font-medium text-black bg-white border-gray-300 rounded-full shadow-lg cursor-pointer btn hover:text-gray-900" key={item.id}>{item.name}</button>
                    ))}
                </div>
                <div className="hidden md:inline-block">
                    <Timeline />
                </div>

            </div>
        </header>
    )
}
