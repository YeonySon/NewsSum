//react import
import { useState } from 'react';

//라이브러리
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import ReactWordcloud from 'react-wordcloud';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar, { Active, ActiveDark, Deactive } from '../../components/util/Tabbar';

//MyPage component import
import Table from '../../components/mypage/Table';

import RadarChart from '../../components/mypage/visuallization/RadarChart';
import VerticalChart from '../../components/mypage/visuallization/VerticalChart';
import { BaseInstance } from '../../hook/AxiosInstance';
import { useRecoilValue } from 'recoil';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

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

  .visual-type {
    display: block;
    margin: 10px 0 10px 0;
  }

  .not-selected {
    display: none;
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

    border-left: 1px solid gray;

    .visual-type {
      display: none;
    }

    .not-selected {
      width: 100%;
      display: inline-block;
    }
  }
`;

function Visualization() {
  const tab = [
    ['분석', 'visualization'],
    ['뉴스', 'mynews'],
    ['키워드', 'keyword'],
    ['내정보', 'myinfo'],
  ];
  const [sort, setSort] = useState(tab[0][0]);

  const types = ['뉴스 키워드 분석', '읽은 뉴스 통계', '스트랩 뉴스 통계'];
  const [type, setType] = useState(types[0]);

  const data = {
    keywordlist: [
      { name: 'AI', frequency: 1000 },
      { name: '11', frequency: 200 },
      { name: '22', frequency: 300 },
      { name: '33', frequency: 400 },
      { name: '44', frequency: 500 },
      { name: '55', frequency: 600 },
      { name: 'AI', frequency: 1000 },
      { name: '11', frequency: 200 },
      { name: '22', frequency: 300 },
      { name: '33', frequency: 400 },
      { name: '44', frequency: 500 },
      { name: '55', frequency: 600 },
    ],
    scrapList: [
      { cgName: 'AI', cnt: 10 },
      { cgName: '131', cnt: 20 },
      { cgName: '141', cnt: 30 },
      { cgName: '1515', cnt: 40 },
      { cgName: '414', cnt: 50 },
      { cgName: '1', cnt: 60 },
    ],
    historyList: [
      { cgName: 'sasdf', cnt: 10 },
      { cgName: 'sg', cnt: 20 },
      { cgName: 'ahffg', cnt: 30 },
      { cgName: 'asdf', cnt: 40 },
      { cgName: 'sadfgw', cnt: 50 },
      { cgName: 'sdf', cnt: 60 },
    ],
  };

  const userId = useRecoilValue(MyInfoAtom);

  // useEffect(() => {
  //   BaseInstance.get(`/mypage/analyze/${userId}`)
  //     .then((response) => {
  //       console.log(response)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })

  // }, [])

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
        </div>
        <hr />
        <div className="visual-type">
          {types.map((t) =>
            t == type ? <ActiveDark>{t}</ActiveDark> : <Deactive onClick={() => setType(t)}>{t}</Deactive>
          )}
          <hr />
        </div>

        <div className={type == types[0] ? 'selected' : 'not-selected'}>
          {/* 여기에 뉴스 키워드 내용을 입력하시오  */}
          <h2>뉴스키워드분석</h2>
          <ReactWordcloud
            words={data.keywordlist.map((li) => ({
              text: li.name,
              value: li.frequency,
            }))}
          />
          <Table list={data.keywordlist} keywordList={true} />
        </div>
        <div className={type == types[1] ? 'selected' : 'not-selected'}>
          {/* 여기에 읽은 뉴스 키워드 내용을 입력하시오  */}
          <h2>읽은 뉴스 통계</h2>
          <Table list={data.historyList} keywordList={false} />
          읽은 뉴스 통계
          <VerticalChart />
        </div>
        <div className={type == types[2] ? 'selected' : 'not-selected'}>
          {/* 여기에 스크랩 뉴스 통계 내용을 입력하시오  */}
          <h2>스크랩뉴스 통계</h2>
          <Table list={data.scrapList} keywordList={false} />
          스크랩뉴스 통계
          <RadarChart />
        </div>
      </Content>
    </div>
  );
}

export default Visualization;
