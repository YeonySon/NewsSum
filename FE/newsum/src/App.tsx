import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//import pages
import Tabbar from './components/util/Tabbar';

import Short from './page/short/Short';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/tab" element={<Tabbar />} />
          <Route path="/test" element={<Short />} />
        </Routes>
      </BrowserRouter>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
