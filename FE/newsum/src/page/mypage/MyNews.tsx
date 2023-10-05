// 라이브러리
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cookie from 'react-cookies';
import styled from 'styled-components';

// recoil import
import { useRecoilValue } from 'recoil';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

// axios instance
import { BaseInstance } from '../../hook/AxiosInstance';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar, { Active, ActiveDark, ActiveLightDark, Deactive } from '../../components/util/Tabbar';
import Dropdown from '../../components/mypage/Dropdown';
import CardSlot from '../../components/news/CardSlot';

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

  .ali {
    position: absolute;
    left: 400px;

    /* transform: translate(-100%, 0); */
    display: flex;
    flex-direction: row-reverse;
  }

  .main {
    /* background-color: #788ca8; */

    display: flex;
    flex-direction: column;
    position: relative;
    margin: 30px 0px 100px 50px;

    width: 370px;
  }

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

    .ali {
      position: absolute;
      left: 400px;
    }
  }
  @media (min-width: 857px) {
    .ali {
      position: absolute;
      left: 770px;
    }
  }
  @media (min-width: 1200px) {
    position: absolute;
    left: 260px;
    width: calc(100vw - 287px);
  }
  @media (min-width: 1396px) {
    .ali {
      position: absolute;
      left: 1140px;
    }
  }
`;

function MyNews() {
  const [newsInfo, setNewsInfo] = useState([]);
  const MyInfo = useRecoilValue(MyInfoAtom);
  const nav = [
    ['분석', 'visualization'],
    ['뉴스', 'mynews'],
    ['키워드', 'keyword'],
    ['내정보', 'myinfo'],
  ];

  // 뉴스 가져오기
  const getNews = async (url) => {
    const token = cookie.load('accessToken');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    await BaseInstance.get(url, { headers })
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          console.log('200');
          console.log(response.data);
          setNewsInfo(response.data.data);
          // setNewsInfo(dummy);
        } else if (response.data.statusCode === 400) {
          console.log('400');
          console.log(response.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  const tab = [
    ['최근 본 뉴스', -1],
    ['스크랩', 0],
  ];

  const scrap = [
    ['전체', 0],
    ['모바일', 1],
    ['인터넷/sns', 2],
    ['IT일반', 3],
    ['보안/해킹', 4],
    ['통신/뉴미디어', 5],
    ['컴퓨터', 6],
    ['게임/리뷰', 7],
  ];
  const ali = [
    ['최신', 2],
    ['인기', 1],
  ];
  const [navlist, setNavlist] = useState(nav[1][0]);
  const [sort, setSort] = useState(tab[0][1]);
  const [sortAli, setSortAli] = useState(ali[0][1]);
  const [page, setPage] = useState(0);

  function clickedSort(info) {
    setSort(info);
  }

  function clickedAli(info) {
    setSortAli(info);
  }

  useEffect(() => {
    console.log('sort changed');

    // 서버에 데이터 요청
    if (sort == -1) {
      getNews(`/api/mypage/mynews/${MyInfo}?page=${page}`);
    } else if (sort != -1) {
      getNews(`/api/mypage/myscrap/${MyInfo}/sort?categoryId=${sort}&optionId=${sortAli}&page=${page}`);
    }
  }, [sort, sortAli, page]);

  return (
    <div>
      <Header />
      <Navbar nav={'mypage'} />
      <Content>
        <div className="wrap-vertical">
          {nav.map((manu) =>
            manu[0] == navlist ? (
              <Active>{manu[0]}</Active>
            ) : (
              <NavLink to={`/mypage/` + manu[1]}>
                <Deactive>{manu[0]}</Deactive>
              </NavLink>
            )
          )}
        </div>
        <div className="wrap-vertical">
          {tab[0][1] == sort ? (
            <ActiveDark>{tab[0][0]}</ActiveDark>
          ) : (
            <Deactive onClick={() => clickedSort(tab[0][1])}>{tab[0][0]}</Deactive>
          )}
          {tab[1][1] <= sort ? (
            <ActiveDark>{tab[1][0]}</ActiveDark>
          ) : (
            <Deactive onClick={() => clickedSort(tab[1][1])}>{tab[1][0]}</Deactive>
          )}
          {tab[1][1] <= sort &&
            scrap.map((manu) =>
              manu[1] == sort ? (
                <ActiveLightDark>{manu[0]}</ActiveLightDark>
              ) : (
                <Deactive onClick={() => clickedSort(manu[1])}>{manu[0]}</Deactive>
              )
            )}
        </div>

        <div className="wrap-vertical">
          <div className="ali">{sort != -1 && <Dropdown sortAli={sortAli} setSortAli={setSortAli} ali={ali} />}</div>
        </div>
        {/* 여기 안에 페이지 제작 */}
        <div className="main">
          {newsInfo.map((news) => (
            <CardSlot newsInfo={news} isRecom={'f'} />
          ))}
        </div>
      </Content>
    </div>
  );
}

export default MyNews;
