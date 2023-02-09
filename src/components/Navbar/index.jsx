import React from "react";
import Timeline from "./timeline";

export default function Index() {
    return (
        <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <div className="flex flex-wrap border rounded-md justify-content space-x-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div className="flex items-center p-1 rounded-md">
                        <input className="outline-none border-none flex-1 ml-1" placeholder="Search here..." />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
                <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <a class="mr-5 hover:text-gray-900 border-2 px-4 rounded-full cursor-pointer">people</a>
                    <a class="mr-5 hover:text-gray-900 border-2 px-4 rounded-full cursor-pointer">places</a>
                    <a class="mr-5 hover:text-gray-900 border-2 px-4 rounded-full cursor-pointer">events</a>
                </nav>
                <Timeline />
            </div>
        </header>
    )
}
