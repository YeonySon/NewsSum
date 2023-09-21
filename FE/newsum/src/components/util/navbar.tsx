import React from 'react';
import { useEffect, useState } from 'react';
//스타일드 컴포넌트
import styled from 'styled-components';
//아이콘
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavBar = styled.div`
  padding: 0;
  margin: 0;
  height: calc(100vh - 60px);
  width: 30%;
  background-color: gray;

  position: relative;

  .nav {
    background-color: aliceblue;

    position: absolute;
    top: 20px;
    left: 100%;
    transform: translate(-105%, 0%);
    padding: 10px;
    margin: 5px;
    width: 250px;

    list-style-type: none;
  }

  //700px 보다 작을 때
  @media (max-width: 700px) {
    background-color: blue;

    height: auto;
    width: 100%;

    position: absolute;
    top: 100%;
    left: 0;
    transform: translate(0, -100%);
    .nav {
    }
  }
`;

const Footer = styled.div`
  /* 생긴거 */
  background-color: #f0eeee;
  /* align-items: left; */
  text-align: left;
  padding: 10px;
  margin: 5px;

  width: 250px;
  height: 250px;
  border-radius: 5px;

  /* 위치 */
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-105%, -105%);
  @media (max-width: 950px) {
    display: none;
  }
`;

const Hr = styled.hr`
  color: gray;

  margin: 0;
  padding: 0;
`;

function Navbar() {
  return (
    <div>
      <NavBar>
        <ul className="nav-img">
          <li>
            <FontAwesomeIcon icon={faCirclePlay} />
          </li>
          <li>
            <FontAwesomeIcon icon={faCirclePlay} />
          </li>
          <li>
            <FontAwesomeIcon icon={faCirclePlay} />
          </li>
        </ul>
        <ul className="nav-text">
          <li>short</li>
          <li>news</li>
          <li>my page</li>
        </ul>

        <Footer>
          <div>
            정보 뉴스룸 연락처 커리어 <br />
            TikTok for Good 광고 Developers <br />
            투명성 TikTok 리워드 <br />
            TikTok Embeds <br />
            도움말 안전 조건 개인 정보 <br />
            크리에어터포털 커뮤니티 가이드라인
            <br /> 저작권
            <br /> 자세히
            <br />
            2023 TicTok
          </div>
        </Footer>
      </NavBar>
    </div>
  );
}

export default Navbar;
