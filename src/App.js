import React from 'react';
import logo from './logo.svg';
import Index from './components/Navbar';
import './App.css';
import TimelineTitle from './components/timeline_title';

function App() {
  return (
    <div className="App">
      <Index />
      <TimelineTitle />
    </div>
  );
}

export default App;
