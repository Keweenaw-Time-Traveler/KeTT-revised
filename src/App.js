import React from 'react';
import MapView from './components/MapView/MapView'
import MainLayer from './components/MainLayer'
import Search from './components/MapView/Search'
import Error from './components/Error'
import './App.css';
function App() {
  return (
    <div className="App">
      <MapView />
      {/* <Search /> */}
      <div className='html-component'>
        <MainLayer />
        <Error />
      </div>

    </div>
  );
}

export default App;
