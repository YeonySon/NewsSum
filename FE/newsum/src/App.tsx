import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// 회원가입
import SignUp1 from './page/signup/SignUp1';
import SignUp2 from './page/signup/SignUp2';
import SignUp3 from './page/signup/SignUp3';

// 로그인 모달창 테스트
import LoginTest from './page/login/test';

//import pages
import Card from './components/news/CardSlot';

import Short from './page/short/Short';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/card" element={<Card />} />
          <Route path="/test" element={<Short />} />
          <Route path='/signup/1' element={<SignUp1 />}/>
          <Route path='/signup/2' element={<SignUp2 />}/>
          <Route path='/signup/3' element={<SignUp3 />}/>
          <Route path='/logintest' element={<LoginTest />}/>
          {/* <Route path='/test' element={<Test />}/> */}
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
