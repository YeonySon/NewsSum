import styled from 'styled-components';
 
const Item = styled.div`
  color: #353845;
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  height: 50px;
  margin: 0;
  padding: 12px 0 0 0;

  a:hover{
    color:darkblue;
  }
`;
 
const Items = styled.div`
  border : 2px solid #9AA3AA;
  border-radius: 20px;
  width : 300px;
  margin: 0;
  padding: 0;

`;

const Hr = styled.hr`
  color: gray;

  margin: 0;
  padding: 0;

`;

function HeaderModal() {

  //로그인 되었는지 확인
  const login = true

  return (
    <div className="headerModal">
      {login ? 
      <Items>
        <Item><a>마이페이지</a></Item>
        <Hr/>
        {/* 나중에 onclick으로 로그아웃 구현 */}
        <Item>로그아웃</Item> 
      </Items>:
      <Items>
        <Item><a>로그인</a></Item>
      </Items>    
    }

    </div>
  );
}

export default HeaderModal;