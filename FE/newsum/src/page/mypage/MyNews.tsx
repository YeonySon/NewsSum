import styled from "styled-components";
import { NavLink } from "react-router-dom";

//Util component import
import Header from "../../components/util/Header";
import Navbar from "../../components/util/Navbar";
import Tabbar, {
  Active,
  ActiveDark,
  Deactive,
} from "../../components/util/Tabbar";
import cookie from "react-cookies";
import { useState } from "react";

export const Content = styled.div`
  border-left: 0;
  /* background-color: lightblue; */
  width: 100%;
  margin: 0;

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

    position: relative;
    margin: 0 0 0 0;

    width: 300;
  }

  //700px 보다 클 때
  @media (min-width: 700px) {
    position: absolute;
    top: 60px;
    left: 17%;

    width: 80%;
    max-width: 1600px;

    border-left: 1px solid gray;
  }
  .main {
    /* background-color: #788ca8; */
    width: 100%;
    max-width: 1600px;
    /* padding: 0 0 0 20px; */

    display: flex;
    flex-wrap: wrap;
  }

  .main > div {
    margin: 20px 0px 0px 15px;
  }
`;

function MyNews() {
  const tab = [
    ["분석", "visualization"],
    ["뉴스", "mynews"],
    ["키워드", "keyword"],
    ["내정보", "myinfo"],
  ];

  const [sort, setSort] = useState(tab[1][0]);

  const ali = [
    ["최근 본 뉴스", 1],
    ["스크랩", 2],
    ["모바일", 3],
    ["인터넷/sns", 4],
    ["IT 일반", 5],
    ["보안/ 해킹", 6],
  ];
  const [sortAli, setSortAli] = useState(ali[0][1]);

  function clickedAli(info) {
    setSortAli(info);
    //aixos
    // console.log(info);
  }

  return (
    <div>
      <Header />
      <Navbar nav={"mypage"} />
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
        </div>
        <div className="wrap-vertical">
          {ali.map((manu) =>
            manu[1] == sortAli ? (
              <ActiveDark>{manu[0]}</ActiveDark>
            ) : (
              <Deactive onClick={() => clickedAli(manu[1])}>{manu[0]}</Deactive>
            )
          )}
        </div>
      </Content>
    </div>
  );
}

export default MyNews;
