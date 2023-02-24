
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.css'
import { INIT_SCENE, SET_CENTER, initMap, setCenter } from "../../store/middleware/ArcGIS";

const MyComponent = () => {
    const dispatch = useDispatch();

    const state = useSelector((state) => state.arcgis);
    console.log("State is ", state);
    useEffect(() => {
        dispatch(initMap('ebf6c16641674d749e6b48130a2c8c6f', document.getElementById('mapDiv')));
    }, []);

    const handleClick = (e) => {
        // e.prevent.

        dispatch(setCenter(
            [-71.6899, 43.0598]
        ))
    }


    return (
        <div id="mapDiv" >
            <button className="mb-30" onClick={(e) => handleClick(e)}>Click me</button>
        </div>);
};

export default MyComponent;
