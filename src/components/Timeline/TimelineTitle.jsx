import React from 'react';
import Timeline from './timeline';

function TimelineTitle() {
    return (
        <div>
            <footer class="text-gray-600 body-font flex items-center justify-center fixed bottom-[7%] left-[50%] translate-x-[-50%] z-[-1]">
                <div class="relative text-left mx-auto md:hidden inline-block">
                    <Timeline />
                </div >
                <div class="relative overflow-hidden hidden md:inline-block">
                    <div class="p-4 bg-white rounded-lg shadow-lg flex items-center">
                        <h2 class="text-l font-bold">{'Some Text'}  1850-2023</h2>
                    </div>
                </div>
            </footer>

        </div>


    )
}

export default TimelineTitle;
