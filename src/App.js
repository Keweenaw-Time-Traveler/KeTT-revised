import React from 'react';
import MapView from './components/MapView/MapView'
import MainLayer from './components/MainLayer'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Error from './components/Error'
import './App.css';
import { fetchTimelineData } from './store/reducers/timelineSlice';
import { setCenter } from './store/actionCreators/ArcGisActionCreator';
function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTimelineData());
  }, [dispatch]);

  const handleClick = (e) => {
    dispatch(setCenter(
      { latitude: -71.6899, longitude: 43.0598 }
    ))
  }

  return (
    <div className="App">
      <MapView />
      {/* <Search /> */}
      <div className='html-component'>
        <button className="fixed z-10 mt-20 p-30 hidden" onClick={(e) => handleClick(e)}>Click me</button>
        <MainLayer />
        <Error />
      </div>
    </div>
  );
}

export default App;
