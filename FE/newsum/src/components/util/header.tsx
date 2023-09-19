import React from "react";
import { useEffect, useState } from 'react';
import styled from 'styled-components';

//컴포넌트 import 
import HeaderModal from "./HeaderModal";
 
export const HeaderStyle = styled.div`
  width: 100%;
  height: 60px;
  padding: 0px;
  background-color: gray;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .header-logo{
    height: 60px;

    padding-left: 20px;


  }
  
  //검색창
  .header-search-big {
    display: none;

  }
  .header-search-small {
    color: green;
  }
  //로그인버튼/프로필
  .header-buttons {
    display: flex;
  flex-direction: row;
  justify-content: space-between;

  }
  .header-login-button{
    display: none;

  }
  .header-profile {
    background-color: black;
    height: 60px;
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    flex-direction: row;
    justify-content: space-between;

  }

  .header-profile img{
    height: 45px;
    width: 45px;

    margin: 0 10px;

  }

  //700px 보다 클 때
  @media (min-width: 700px) {
    background-color: blue;
    .header-login-button{
      line-height: 45px; /* 텍스트의 높이를 컨테이너의 높이와 동일하게 설정 */
      display: inline-block; /* 인라인 블록 요소로 설정하여 수평 정렬 */

      width: 85px;
      height: 45px;
      border-radius: 8px;

      background-color: #0583F2;
      color: white;
      font-size: 18px;
      font-weight: bold;
      
      margin-top: 8px;

    }

    .header-search-big {
        display: flex;
        color : yellow;
        background-color: black;

    }
    .header-search-small {
        display: none;

    }

    .header-profile img{
      margin: 0 20px;
    }
    

  }



`;
 
const Hr = styled.hr`
  color: gray;

  margin: 0;
  padding: 0;

`;

function Header() {
  const [modal, setModal] =  useState(true)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      }, [window.innerWidth]);

  function search()  {
    alert('마이페이지로 이동');
  }


  return (
    <div>
      <HeaderStyle>
      <img className="header-logo" src={`${process.env.PUBLIC_URL}/newsum.png`} alt='logo' />

        <div className='header-search-small'>
        <img className="header-logo" src={`${process.env.PUBLIC_URL}/logo192.png`} alt='logo' />

        </div>
        <div className='header-search-big'>big</div>
        <div className="header-buttons">
          <div className="header-login-button">로그인</div>
          <div className="header-profile">
            <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="프로필" />
          </div>
        </div>
      </HeaderStyle>

    </div>
  );
}

export default Header;
