import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { initMap, setCenter } from '../../store/middleware/ArcGisActionCreator';

import './styles.css';

const MyComponent = () => {
    const currentMap = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initMap('ebf6c16641674d749e6b48130a2c8c6f', currentMap.current));
        // dispatch
    }, [dispatch]);

    return (
        <div>
            <div id="" ref={currentMap}></div>
        </div>
    );
};

export default MyComponent;
