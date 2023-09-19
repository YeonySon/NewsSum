import logo from './logo.svg';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//import pages
import HeaderModal from './components/util/HeaderModal'
import Header from './components/util/Header'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/header' element={<Header />}/>
          <Route path='/headermodal' element={<HeaderModal />}/>
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
