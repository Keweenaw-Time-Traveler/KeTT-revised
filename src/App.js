import React from 'react';
import MapView from './components/MapView'
import MainLayer from './components/MainLayer'
import Search from './components/MapView/Search'
import './App.css';
function App() {
  return (
    <div className="App">
      <MapView />
      {/* <Search /> */}
      <div className='html-component'>
        <MainLayer />
      </div>

    </div>
  );
}

export default App;
