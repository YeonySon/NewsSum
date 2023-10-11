// 라이브러리
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar, { Active, Deactive } from '../../components/util/Tabbar';

import KeywordComponent from '../../components/mypage/KeywordComponent';

export const Content = styled.div`
  border-left: 0;
  /* background-color: lightblue; */
  width: 100%;
  /* left: 0; */
  margin: 0;
  top: 60px;
  position: absolute;

  .wrap-vertical {
    margin: 15px 0 0;
    padding: 5px 0 5px 40px;
    overflow-x: scroll;
    /* 가로 스크롤 */
    overflow: auto;
    white-space: nowrap;
  }
  .wrap-vertical::-webkit-scrollbar {
    height: 6px;
  }
  .wrap-vertical::-webkit-scrollbar-thumb {
    width: 50%; /* 스크롤바의 길이 */
    background: #788ca8; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
  .wrap-vertical::-webkit-scrollbar-track {
    background: rgba(43, 49, 57, 0.1); /*스크롤바 뒷 배경 색상*/
  }

  .main {
    /* background-color: #788ca8; */

    display: flex;
    top: 60px;
    position: relative;
    margin: 0 0 0 0;

    width: 370px;
  }

  //700px 보다 클 때
  //700px 보다 클 때
  @media (min-width: 700px) {
    position: absolute;
    left: 100px;

    width: calc(100vw - 117px);

    top: 60px;
    max-width: 1340px;

    /* border-left: 1px solid gray; */
    .main {
      /* background-color: #788ca8; */
      width: 100%;
      max-width: 1600px;
      /* padding: 0 0 0 20px; */

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .main > div {
      margin: 20px 0px 0px 0px;
    }

    .main > div {
      margin: 20px 0px 0px 0px;
    }
    @media (min-width: 1200px) {
      position: absolute;
      left: 260px;
      width: calc(100vw - 287px);
    }
  }
`;

function Keyword() {
  const tab = [
    ['분석', 'visualization'],
    ['뉴스', 'mynews'],
    ['키워드', 'keyword'],
    ['내정보', 'myinfo'],
  ];
  const [sort, setSort] = useState(tab[2][0]);

  return (
    <div>
      <Header />
      <Navbar nav={'mypage'} />
      <Content>
        <div className="wrap-vertical">
          {tab.map((manu) =>
            manu[0] == sort ? (
              <Active>{manu[0]}</Active>
            ) : (
              <NavLink to={`/mypage/` + manu[1]}>
                <Deactive>{manu[0]}</Deactive>
              </NavLink>
            )
          )}
          <KeywordComponent pageType={1} />
        </div>
      </Content>
    </div>
  );
}

export default Keyword;
