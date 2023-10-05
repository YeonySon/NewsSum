import styled from 'styled-components';

// cookies
import cookie from 'react-cookies';

// recoil
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

//axios
import { BaseInstance } from '../../hook/AxiosInstance';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import { Active, ActiveDark, Deactive } from '../../components/util/Tabbar';

//news compoent import
import CardSlot from '../../components/news/CardSlot';
import { useEffect, useState } from 'react';
import { SearchAtom } from '../../recoil/atoms/SearchAtom';

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
    padding: 5px 10px 5px 10px;
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
    width: 410px;

    /* transform: translate(-100%, 0); */
    display: flex;
    flex-direction: row-reverse;
  }

  .main {
    /* background-color: #788ca8; */

    display: flex;
    flex-direction: column;
    position: relative;
    margin: 30px 0px 100px 0px;
    padding: 0 0 0 40px;

    width: 320px;
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

      padding: 0 0 0 0px;
    }
    .wrap-vertical {
      margin: 15px 0 0;
      padding: 5px 50px 5px 50px;
    }
    .main > div {
      margin: 20px 0px 0px 0px;
    }

    .ali {
      width: 370px;
    }
  }
  @media (min-width: 857px) {
    .ali {
      width: 740px;
    }
  }
  @media (min-width: 1200px) {
    position: absolute;
    left: 260px;
    width: calc(100vw - 287px);
  }
  @media (min-width: 1396px) {
    .ali {
      width: 1110px;
    }
  }
`;

function News() {
  const [newsInfo, setNewsInfo] = useState([]);

  const MyInfo = useRecoilValue(MyInfoAtom);
  // const setMyinfo = useSetRecoilState(MyInfoAtom);

  const tab = [
    ['추천', -1],
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
  const [sort, setSort] = useState(tab[0][1]);
  const [sortAli, setSortAli] = useState(ali[0][1]);
  const [page, setPageAli] = useState(0);

  function clickedTab(info) {
    setSort(info);
  }
  function clickedAli(info) {
    setSortAli(info);
  }

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

  const [Search, setSearch] = useRecoilState(SearchAtom);

  useEffect(() => {
    console.log('page search changed');
    console.log(Search);

    // 서버에 데이터 요청
    if (Search != '') {
      setSort(tab[0][1]);
      setSortAli(ali[0][1]);
      getNews(`/api/news/${MyInfo}/search?keyword=${Search}&page=${page}`);
    }
  }, [Search]);

  useEffect(() => {
    console.log('sort changed');

    // 서버에 데이터 요청
    if (sort == -1 && Search == '') {
      if (MyInfo == 0) {
        setSort(0);
      } else {
        getNews(`/api/news/recommend/${MyInfo}`);
      }
    } else if (sort != -1) {
      getNews(`/api/news/${MyInfo}/sort?category=${sort}&option=${sortAli}&page=${page}`);
      setSearch('');
    }
  }, [sort, sortAli]);

  return (
    <div>
      <Header />

      <Navbar nav={'news'} />
      <Content>
        <div className="wrap-vertical">
          {tab.map((manu) =>
            manu[1] == sort ? (
              <Active>{manu[0]}</Active>
            ) : (
              <Deactive onClick={() => clickedTab(manu[1])}>{manu[0]}</Deactive>
            )
          )}
        </div>
        <div className="ali">
          {sort != -1 &&
            ali.map((manu) =>
              manu[1] == sortAli ? (
                <ActiveDark>{manu[0]}</ActiveDark>
              ) : (
                <Deactive onClick={() => clickedAli(manu[1])}>{manu[0]}</Deactive>
              )
            )}
        </div>
        {/* <hr /> */}
        {/* 여기 안에 페이지 제작 */}
        <div className="main">
          {newsInfo.map((news) => (
            <CardSlot newsInfo={news} isRecom={sort != -1 ? 't' : 'f'} />
          ))}
        </div>
      </Content>
    </div>
  );
}

export default News;
