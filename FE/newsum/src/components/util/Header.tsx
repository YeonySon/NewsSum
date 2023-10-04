import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// navigater
import { useNavigate } from 'react-router-dom';

//컴포넌트 import
import HeaderModal from './HeaderModal';

//recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { LoginModalIsOpenAtom } from '../../recoil/atoms/LoginModalAtom';
import MyInfo from '../../page/mypage/MyInfo';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';
import { SearchAtom } from '../../recoil/atoms/SearchAtom';

export const HeaderStyle = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  text-align: center;

  /* 로고 */
  .header-logo {
    height: 60px;
    /* padding-left: 60px; */
  }

  //검색창
  /* -작은화면에서는 안보임 */
  .header-search-big {
    display: none;
  }
  /* 작은화면용 검색창 */
  .header-search-small {
    height: 60px;
    width: 80%;
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    flex-direction: row;
    justify-content: space-between;
  }
  /* 작은화면용 검색 버튼 */
  .header-search-small > .search {
    height: 35px;
    width: 35px;
  }

  //로그인버튼
  .header-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .header-login-button {
    display: none;
  }
  /* 프로필 */
  .header-profile {
    height: 60px;
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    flex-direction: row;
    justify-content: space-between;
  }
  .header-profile .profile {
    height: 45px;
    width: 45px;

    margin: 0 10px;
  }

  .search {
    /* border: 1px #9AA3AA solid; */
    height: 35px;
    width: 35px;

    margin: 0 15px;
  }

  //700px 보다 클 때
  @media (min-width: 700px) {
    .header-logo {
      height: 60px;
      padding-left: 30px;
    }

    .header-login-button {
      line-height: 41px; /* 텍스트의 높이를 컨테이너의 높이와 동일하게 설정 */
      display: inline-block; /* 인라인 블록 요소로 설정하여 수평 정렬 */

      /* min-width: 50px; */
      width: 85px;
      height: 40px;
      border-radius: 8px;

      background-color: #0583f2;
      color: white;
      font-size: 16px;
      font-weight: bold;

      margin: 11px 5px 0 0;
    }

    .header-search-big {
      display: flex;
      width: 80%;
      max-width: 600px;
      text-align: center;
    }

    .header-search-small {
      display: none;
    }
    .search {
      display: none;
    }

    .header-profile img {
      margin: 0 20px;
    }
  }
`;

export const SearchInput = styled.div`
  width: 100%;
  position: relative;
  .header-input {
    width: 80%;
    height: 35px;
    font-size: 1.2rem;

    margin: 10px 5%;
    padding-left: 20px;

    border: 2px #9aa3aa solid;
    border-radius: 8px;
  }

  img {
    /* border: 1px #9AA3AA solid; */
    position: absolute;
    top: 30px;
    left: 90%;
    transform: translate(-170%, -50%);

    margin: 0 15px;
  }

  .big {
    height: 20px;
    width: 20px;

    margin: 0 15px;
  }

  .small {
    height: 15px;
    width: 15px;

    transform: translate(-190%, -50%);

    margin: 0 15px;
  }

  //700px 보다 클 때
  @media (min-width: 700px) {
  }
`;

const Hr = styled.hr`
  color: gray;

  margin: 0;
  padding: 0;
`;

function Header() {
  const navigate = useNavigate();

  const [profileModal, setProfileModal] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [keyword, setKeyword] = useState('');

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const setLoginModalOpen = useSetRecoilState(LoginModalIsOpenAtom);
  const MyInfo = useRecoilValue(MyInfoAtom);

  const [Search, setSearch] = useRecoilState(SearchAtom);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [window.innerWidth]);

  function search(e) {
    // onCheckEnter(e);
    setSearch(e.target.value);
    console.log(Search);
  }

  function login() {
    setUserInfo(true);
    setProfileModal(false);
    setLoginModalOpen(true);
  }

  function ToggleProfileModal() {
    console.log('토글');
    setProfileModal(!profileModal);
  }

  function ToggleSearchBar() {
    console.log('토글');
    setSearchClicked(!searchClicked);
  }

  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter');
      navigate('/news');
      return;
    }
  };

  return (
    <div>
      <HeaderStyle>
        {/* 로고 */}
        {!searchClicked && <img className="header-logo" src={`${process.env.PUBLIC_URL}/newsum.png`} alt="logo" />}
        {/* 큰 화면일 때 검색창 */}
        <div className="header-search-big">
          <SearchInput>
            <input
              className="header-input"
              onChange={(e) => search(e)}
              onKeyDown={(e) => onCheckEnter(e)}
              value={Search}
              placeholder="검색어를 입력하시오"
            />
            <img className="big" src={`${process.env.PUBLIC_URL}/img/util/search.png`} />
          </SearchInput>
        </div>
        {/* 작은 화면일 때 검색창 */}
        <div className="header-search-small">
          {searchClicked ? (
            <SearchInput>
              <input
                className="header-input"
                onChange={(e) => search(e)}
                onKeyDown={(e) => onCheckEnter(e)}
                value={Search}
                placeholder="검색어를 입력하시오"
              />
              <img className="small" src={`${process.env.PUBLIC_URL}/img/util/x.png`} onClick={ToggleSearchBar} />
            </SearchInput>
          ) : null}
        </div>

        {/* 로그인 버튼 */}
        {MyInfo == 0 && (
          <div className="header-login-button" onClick={login}>
            로그인
          </div>
        )}
        {/* 프로필 버튼 */}
        <div className="header-profile">
          {!searchClicked && (
            <img
              className="search"
              src={`${process.env.PUBLIC_URL}/img/util/search.png`}
              alt="logo"
              onClick={ToggleSearchBar}
            />
          )}
          {userInfo ? (
            //  toDo : 로그인 시 프로필이미지 띄우기
            <img
              className="profile"
              src={`${process.env.PUBLIC_URL}/img/util/profile-user.png`}
              onClick={ToggleProfileModal}
              alt="프로필"
            />
          ) : (
            <img
              className="profile"
              src={`${process.env.PUBLIC_URL}/img/util/profile-user.png`}
              onClick={ToggleProfileModal}
              alt="프로필"
            />
          )}
        </div>
      </HeaderStyle>

      {/* 프로필모달  */}
      {/* 로그인을 했는지 안했는지 props로 전달 */}
      {profileModal && <HeaderModal setProfileModal={setProfileModal} />}

      <Hr />
    </div>
  );
}

export default Header;
