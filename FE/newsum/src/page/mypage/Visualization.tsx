// 라이브러리
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import cookie from "react-cookies";
import styled from "styled-components";

// recoil import
import { useRecoilValue } from "recoil";
import { MyInfoAtom } from "../../recoil/atoms/MyInfoAtom";

// axios instance
import { BaseInstance } from "../../hook/AxiosInstance";

// 페이지 입장 권한 확인
import { CheckCookie } from '../../hook/token';

//Util component import
import Header from "../../components/util/Header";
import Navbar from "../../components/util/Navbar";
import Tabbar, {
  Active,
  ActiveDark,
  Deactive,
} from "../../components/util/Tabbar";

//MyPage component import
import WordCloud from "../../components/mypage/visuallization/WordCloud";
import VerticalChart from "../../components/mypage/visuallization/VerticalChart";
import RadarChart from "../../components/mypage/visuallization/RadarChart";
import { DivColLine } from "../../components/mypage/visuallization/GraphStyle";

export const Content = styled.div`
  border-left: 0;
  /* background-color: lightblue; */
  width: 100%;
  margin: 0;
  padding: 0px 10px;

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

  .visual-type {
    display: block;
    margin: 10px 0 10px 0;
  }

  .selected {
    position: relative;
    visibility: visible;
  }

  .not-selected {
    /* display: none; */
    position: absolute;
    visibility: hidden;
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
  //700px 보다 클 때
  @media (min-width: 700px) {
    position: absolute;
    top: 60px;
    left: 17%;

    width: 80%;
    max-width: 1600px;

    /* border-left: 1px solid gray; */

    .visual-type {
      display: none;
    }

    .not-selected {
      width: 100%;
      /* display: inline-block; */
    }
  }
`;

export const VisualizationPage = styled.div`
  /* width: 95%; */
  margin: 10px 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
`;

export const GraphContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const DivRowLine = styled.div`
  width: 100%;
  height: 1px;
  margin: 5px 0px;
  background-color: #d9d9d9;

  @media (max-width: 700px) {
    display: none;
  }
`;

function Visualization() {
  const tab = [
    ["분석", "visualization"],
    ["뉴스", "mynews"],
    ["키워드", "keyword"],
    ["내정보", "myinfo"],
  ];
  const [sort, setSort] = useState(tab[0][0]);

  const types = ["뉴스 키워드 분석", "읽은 뉴스 통계", "스트랩 뉴스 통계"];
  const [type, setType] = useState(types[0]);

  const userId = useRecoilValue(MyInfoAtom);
  const [data, setData] = useState<never[] | undefined>(undefined);

  useEffect(() => {
    // 로그인 여부 확인
    CheckCookie();

    // 쿠키 불러오기
    const headers = {
      'Authorization': `Bearer ${cookie.load('accessToken')}`
    }
    BaseInstance.get(`/api/mypage/analyze/${userId}`, { headers: headers })
      .then((response) => {
        setData(response.data.data)

      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

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
        <hr />
        <div className="visual-type">
          {types.map((t) =>
            t == type ? (
              <ActiveDark>{t}</ActiveDark>
            ) : (
              <Deactive onClick={() => setType(t)}>{t}</Deactive>
            )
          )}
          <hr />
        </div>
        {
          data !== undefined ?
          (<>
            <WordCloud data={data} isActive={type == types[0]} />
            <DivRowLine />
            <GraphContainer>
              <VerticalChart responseData={data.readList} isActive={type == types[1]} />
              <DivColLine />
              <RadarChart responseData={data.jobList} isActive={type == types[2]} />
            </GraphContainer>
          </>) :
          (
            <>
              <img style={{ width: '30%', height: 'auto' }} src={`${process.env.PUBLIC_URL}/img/page/noData.jpg`} alt="logo" />
              <p>수집된 정보가 부족하여 데이터를 분석할 수 없습니다.</p>
            </>
          )
        }
      </Content>
    </div>
  );
}

export default Visualization;
