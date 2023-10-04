import React from "react";
import { useEffect, useState } from "react";

import styled from "styled-components";
import { NavLink } from "react-router-dom";

//icon import
import { FaPlayCircle, FaRegPlayCircle } from "react-icons/fa";
import { RiFilePaperFill, RiFilePaperLine } from "react-icons/ri";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

// loginModal component import
import LoginModal from "../../page/login/loginModal";

// recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { LoginModalIsOpenAtom } from "../../recoil/atoms/LoginModalAtom";
import MyInfo from "../../page/mypage/MyInfo";
import { MyInfoAtom } from "../../recoil/atoms/MyInfoAtom";
import { SearchAtom } from "../../recoil/atoms/SearchAtom";

export const NavBar = styled.div`
  padding: 0;
  margin: 0;
  height: calc(100vh - 62px);
  top: 61px;
  width: 260px;
  /* background-color: gray; */

  z-index: 10;
  background-color: white;

  position: fixed;

  color: #394867;

  border-right: 1px solid gray;

  .active a {
    color: #0583f2;
  }

  .deactive a {
    color: #394867;
  }

  .nav {
    /* background-color: aliceblue; */

    position: absolute;
    top: 5px;
    left: 100%;
    transform: translate(-90%, 0%);
    padding: 10px;
    margin: 5px;
    width: 250px;

    list-style-type: none;

    font-size: 2rem;
  }

  .nav li {
    margin: 20px 0;
    &:hover {
      cursor: pointer;
    }
  }

  .nav strong {
    display: inline-block;
    padding: 0px 0px 0px 20px;
    font-size: 1.7rem;
    transform: translate(0%, -22%);
  }

  @media (max-width: 1200px) {
    width: 100px;
    .nav {
      width: 20%;
      font-size: 2.2rem;
      padding-right: 50px;
    }
    .nav strong {
      display: none;
    }
  }

  //700px 보다 작을 때
  @media (max-width: 700px) {
    /* background-color: blue; */

    height: 90px;
    width: 100%;

    position: absolute;
    top: 100%;
    left: 0;
    transform: translate(0, -100%);

    position: fixed;

    margin: 0;
    padding: 0;

    border-right: 0;

    border-top: 1px solid gray;

    font-size: 2rem;
    .nav {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(00%, 0%);
      padding: 0px;
      margin: 0px;
      width: 100%;
      /* 요소정렬 */
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .nav li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      transform: translate(20%, 0%);
      position: relative;
    }
    .nav strong {
      position: absolute;
      display: inline-block;
      text-align: center;
      width: 100px;
      font-size: 1rem;

      /* overflow: auto; */
      white-space: nowrap;
      transform: translate(-73%, 160%);
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

  width: 225px;
  height: 250px;
  border-radius: 5px;

  /* 위치 */
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-105%, -105%);
  @media (max-width: 1200px) {
    display: none;
  }
  @media (max-height: 730px) {
    display: none;
  }
`;

const Button = styled.div`
  line-height: 45px; /* 텍스트의 높이를 컨테이너의 높이와 동일하게 설정 */
  display: inline-block; /* 인라인 블록 요소로 설정하여 수평 정렬 */

  width: 185px;
  height: 50px;
  border-radius: 12px;

  background-color: #0583f2;
  color: white;
  font-size: 24px;
  font-weight: bold;

  /* margin-top: px; */

  text-align: center;

  position: absolute;
  top: 300px;
  left: 100%;
  transform: translate(-115%, 0%);
  padding: 10px;
  margin: 5px;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    display: none;
  }
`;

function Navbar({ nav }) {
  const [userId, setUserId] = useState("");

  // login
  const [loginModalOpen, setLoginModalOpen] =
    useRecoilState(LoginModalIsOpenAtom);
  const [isAnimating, setIsAnimating] = useState(false);

  const MyInfo = useRecoilValue(MyInfoAtom);

  const setSearch = useSetRecoilState(SearchAtom);

  // modal FadeIn, FadeOut를 위한 시간 지연
  useEffect(() => {
    if (loginModalOpen) {
      setIsAnimating(true);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  }, [loginModalOpen]);

  function login() {
    setLoginModalOpen(true);
  }

  return (
    <div>
      <NavBar>
        <ul className="nav">
          <li className={nav == "short" ? "active" : "deactive"}>
            <NavLink to="/short">
              {nav == "short" ? <FaPlayCircle /> : <FaRegPlayCircle />}
              <strong>short</strong>
            </NavLink>
          </li>
          <li className={nav == "news" ? "active" : "deactive"}>
            <NavLink to="/news">
              {nav == "news" ? <RiFilePaperFill /> : <RiFilePaperLine />}
              <strong>news</strong>
            </NavLink>
          </li>
          <li className={nav == "mypage" ? "active" : "deactive"}>
            <NavLink to="/mypage">
              {nav == "mypage" ? <FaUserCircle /> : <FaRegUserCircle />}
              <strong>my page</strong>
            </NavLink>
          </li>
        </ul>
        {MyInfo == 0 && <Button onClick={login}>Log In</Button>}

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
      {(loginModalOpen || isAnimating) && <LoginModal />}
    </div>
  );
}

export default Navbar;
