import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';
import { LoginModalIsOpenAtom } from '../../recoil/atoms/LoginModalAtom';

export const Item = styled.div`
  color: #353845;
  text-align: center;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: bold;
  height: 30px;
  margin: 0;
  padding: 10px 0 0 0;

  cursor: pointer;

  a:hover {
    color: darkblue;
  }
`;

export const Items = styled.div`
  border: 2px solid #9aa3aa;
  background-color: #ffffff;
  border-radius: 8px;
  width: 150px;
  margin: 0;
  padding: 0;

  box-shadow: 2px 2px 1px 2px #f8f8f8;

  /* 프로필 아이콘 밑으로 이동 */
  position: absolute;
  top: 65px;
  left: 100%;
  transform: translate(-105%, 0);

  z-index: 10;
`;

export const Hr = styled.hr`
  color: gray;

  margin: 0;
  padding: 0, 10px;
`;

function HeaderModal({ setProfileModal }) {
  const setMyinfo = useSetRecoilState(MyInfoAtom);
  const MyInfo = useRecoilValue(MyInfoAtom);
  const setLoginModalOpen = useSetRecoilState(LoginModalIsOpenAtom);
  //로그인 되었는지 확인

  function myPage() {
    alert('마이페이지로 이동');
  }

  function logout() {
    // alert("로그아웃");
    setProfileModal(false);
    setMyinfo(0);
  }

  function login() {
    // alert("로그인");
    setProfileModal(false);
    setLoginModalOpen(true);
  }

  return (
    <div className="headerModal">
      {MyInfo != 0 ? (
        <Items>
          <Item onClick={myPage}>
            <a>마이페이지</a>
          </Item>
          <Hr />
          {/* 나중에 onclick으로 로그아웃 구현 */}
          <Item onClick={logout}>로그아웃</Item>
        </Items>
      ) : (
        <Items>
          <Item onClick={login}>
            <a>로그인</a>
          </Item>
        </Items>
      )}
    </div>
  );
}

export default HeaderModal;
