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

import News from './page/news/News';
import Short from './page/short/Short';

// mypage
import Visualization from './page/mypage/Visualization';
import MyInfo from './page/mypage/MyInfo';
import Keyword from './page/mypage/Keyword';
import MyNews from './page/mypage/MyNews';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/news" element={<News />} />
          <Route path="/short" element={<Short />} />
          <Route path="/signup/1" element={<SignUp1 />} />
          <Route path="/signup/2" element={<SignUp2 />} />
          <Route path="/signup/3" element={<SignUp3 />} />
          <Route path="/logintest" element={<LoginTest />} />

          <Route path="/mypage" element={<Visualization />} />
          <Route path="/mypage/visualization" element={<Visualization />} />
          <Route path="/mypage/mynews" element={<MyNews />} />
          <Route path="/mypage/keyword" element={<Keyword />} />
          <Route path="/mypage/myinfo" element={<MyInfo />} />

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
