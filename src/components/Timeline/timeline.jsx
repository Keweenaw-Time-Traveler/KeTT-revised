import React from 'react';
import { useEffect, useState } from 'react';
import configureStore from "../../store/configureStore";
import * as actions from '../../store/actionCreators/api'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTimelineData } from '../../store/reducers/timeLineSlicer';


const Timeline = () => {
    const store = configureStore();

    // useEffect(() => {
    //     store.dispatch(actions.apiCallBegan({
    //         url: '/',
    //         method: 'get',
    //         onSuccess: 'dataReceived',
    //     }
    //     ))
    // }, [])

    const dispatch = useDispatch();


    const itemsInStore = useSelector((state) => state.timeline)
    const timeLineChanged = store.getState();
    const [items, setItems] = useState([])

    useEffect(() => {
        console.log(timeLineChanged);
        dispatch(fetchTimelineData());
        setItems(itemsInStore.timelineData);
    }, [])

    return (
        <div className="relative text-left">
            <select className="flex justify-center p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" role="menuitem" tabIndex="-1" id="menu-item-1">Timeline

                </option>
                {items.length > 0 ? items.map((item, i) => (
                    <option key={i} className="block px-4 py-2 text-sm text-gray-700" value="select">Keweenaw {item.min} - {item.max}</option>
                )) : "<Loading>"}
            </select>
        </div >
    )
}

export default Timeline;