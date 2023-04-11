import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import { fetchTimelineData } from '../../store/reducers/timeLineSlicer';
import { selectedTimeline } from '../../store/reducers/timelineSlice';
import { setError } from '../../store/reducers/errorsSlice';
import { timeLineNotFound } from '../../assets/data/Errors/customMessages';
import { setPortalURl } from '../../store/actionCreators/ArcGisActionCreator';


const Timeline = () => {
    const dispatch = useDispatch();
    const currentYearFromStore = useSelector((state) => state.currentState?.timeline?.currentYear)
    const itemsInStore = useSelector((state) => state.timeline?.timelineData);
    const [items, setItems] = useState([]);


    useEffect(() => {
        // console.log("Item are", itemsInStore);
        setItems(itemsInStore);
    }, [itemsInStore]);

    const handleOnChangeTimeLine = (year) => {
        const currentYearMap = itemsInStore?.filter((item) => item.map_year == year)
        // console.log("CurrentYear Map in Timeline is ", currentYearMap);
        if (currentYearMap[0]?.url) {
            dispatch(selectedTimeline({ year, url: currentYearMap[0]?.url, startDate: currentYearMap[0]?.min, endDate: currentYearMap[0].max }))
        }
        else
            dispatch(setError(timeLineNotFound))
    }



    return (

        (items && <div className="relative text-left">
            <select onChange={(e) => handleOnChangeTimeLine(e.target.value)} value={currentYearFromStore} className="flex justify-center p-2 pr-6 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option value='default' className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">Timeline
                </option>
                {items ? items.map((item, i) => (
                    <option key={i} className="block px-4 py-2 text-sm text-gray-700" value={item.map_year} >{item.min} - {item.max}</option>
                )) : "<Loading>"}
            </select>

        </div >)
    )
}

export default Timeline;
