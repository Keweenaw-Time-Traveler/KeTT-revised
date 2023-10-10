import React from "react";
import WebTimeline from "./NavbarComponents/WebTimeline";
import NavbarTiles from './NavbarComponents/NavbarTiles';
import Searchbar from './NavbarComponents/Searchbar';

export default function Index() {

    return (
        <header className="text-gray-600 body-font">
            <div className="p-5 flex justify-center w-[100vw] flex-col items-center md:flex-row space-y-6 md:space-y-0">
                <Searchbar />
                <NavbarTiles />
                <WebTimeline />
            </div>
        </header>
    );
}