
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './styles.css'
// import { initMap, setCenter } from "../../store/middleware/ArcGIS";
import { initMap, setCenter } from '../../store/middleware/ArcGisActionCreator';

const MyComponent = () => {
    const dispatch = useDispatch();

    const state = useSelector((state) => state.arcgis);
    console.log("State is ", state);
    useEffect(() => {
        dispatch(initMap('ebf6c16641674d749e6b48130a2c8c6f', document.getElementById('mapDiv')));
    }, []);


    return (
        <div>

            <div id="mapDiv" >

            </div>

        </div>

    )
        ;
};

export default MyComponent;
