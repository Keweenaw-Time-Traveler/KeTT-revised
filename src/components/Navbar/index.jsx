import React from "react";

export default function Index() {
    return (
        <div>
            <section className="relative text-gray-600 body-font">
                <div className="absolute inset-0 bg-gray-300">
                    <div className="embed-container">
                        <iframe style={{ height: '100vh', width: '100vw' }} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="TestingMap" src="//mtu.maps.arcgis.com/apps/Embed/index.html?webmap=2cb01996eaa14550aa60aa52dbb737cf&extent=-98.7809,39.2345,-74.5231,49.8257&zoom=true&previewImage=true&scale=true&disable_scroll=true&theme=light"></iframe>
                    </div>
                </div>

                <div className="container flex">

                </div>
                <div className="container flex px-5 py-24 mx-auto fle">

                    <div className="relative flex flex-col w-full p-8 mt-10 bg-white rounded-lg shadow-md lg:w-1/3 md:w-1/2 md:ml-auto md:mt-0">
                        <h2 className="mb-1 text-lg font-medium text-gray-900 title-font">Feedback</h2>
                        <p className="mb-5 leading-relaxed text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe</p>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="text-sm leading-7 text-gray-600">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="message" className="text-sm leading-7 text-gray-600">Message</label>
                            <textarea id="message" name="message" className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"></textarea>
                        </div>
                        <button className="px-6 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600">Button</button>
                        <p className="mt-3 text-xs text-gray-500">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
                    </div>
                </div>
            </section >
        </div >
    );
}
