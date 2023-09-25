import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import SignUp1 from './page/signup/signUp1';
import SignUp2 from './page/signup/signUp2';
import SignUp3 from './page/signup/signUp3';

//import pages
import Card from './components/news/CardSlot';

import News from './page/news/News';
import ShortComponent from './components/short/Short';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/news" element={<News />} />
          {/* <Route path="/test" element={<Short />} /> */}
          <Route path="/short" element={<ShortComponent />} />
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
