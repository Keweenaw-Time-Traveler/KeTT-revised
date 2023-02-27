import React from 'react';
import Timeline from './Timeline';
import { useSelector } from 'react-redux';

function TimelineTitle() {
    const { startDate, endDate } = useSelector((state) => state.currentState?.timeline)
    // console.log("Started Date is ", startDate, "ENd Date is ", endDate);
    return (
        <div>
            <footer className="text-gray-600 body-font flex items-center justify-center fixed bottom-[7%] left-[50%] translate-x-[-50%] z-[-1]">
                <div className="relative inline-block mx-auto text-left md:hidden">
                    <Timeline />
                </div >
                <div className="relative hidden overflow-hidden md:inline-block">
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
                        <h2 className="font-bold text-l">{'Timeline of Map is '}  {startDate} - {endDate}</h2>
                    </div>
                </div>
            </footer>

        </div>


    )
}

export default TimelineTitle;
