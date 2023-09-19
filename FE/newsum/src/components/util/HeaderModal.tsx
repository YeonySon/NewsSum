import { useEffect, useState } from 'react';
import styled from 'styled-components';
 
const Item = styled.div`
  color: #353845;
  text-align: center;
  font-size: 1.2rem;
  line-height: 2rem;
  font-weight: 400;
  height: 40px;
  margin: 0;
  padding: 10px 0 0 0;

  a:hover{
    color:darkblue;
  }
`;
 
const Items = styled.div`
  border : 1px solid #9AA3AA;
  background-color : #ffffff;
  border-radius: 8px;
  width : 300px;
  margin: 0;
  padding: 0;

  box-shadow: 2px 2px 5px 5px #f8f8f8

`;

const Hr = styled.hr`
  color: gray;

  margin: 0;
  padding: 0 , 10px;

`;

function HeaderModal() {
  const [user, setUser] =  useState(true)


  //로그인 되었는지 확인

  function myPage()  {
    alert('마이페이지로 이동');
  }

  function logout()  {
    alert('로그아웃');
    setUser(false)
  }

  function login()  {
    alert('로그인');
    setUser(true)
  }


  return (
    <div className="headerModal">
      {user ? 
      <Items>
        <Item onClick={myPage}><a>마이페이지</a></Item>
        <Hr/>
        {/* 나중에 onclick으로 로그아웃 구현 */}
        <Item onClick={logout}>로그아웃</Item> 
      </Items>:
      <Items>
        <Item onClick={login}><a>로그인</a></Item>
      </Items>    
    }

    </div>
  );
}

export default HeaderModal;
