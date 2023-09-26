import { useState } from 'react';
import styled from 'styled-components';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar from '../../components/util/Tabbar';

//news compoent import
import CardSlot from '../../components/news/CardSlot';

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

function Clicked() {
  const newsInfo = [
    {
      id: 1,
      head: '헤드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 2,
      head: '헤드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 3,
      head: '헤드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 4,
      head: '헤드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 5,
      head: '헤드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드2345라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드1111라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 1,
      head: '헤드3333라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 2,
      head: '헤드2222라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 3,
      head: '헤34566드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 4,
      head: '3222드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 5,
      head: '헤드라3425인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드1234라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤22345드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드라인헤234드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 1,
      head: '헤드라인33헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 2,
      head: '헤드라23인헤드252라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 3,
      head: '헤22드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 4,
      head: '헤드라인헤드라2345인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 5,
      head: '헤드라인헤623드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드라인234헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드라인345헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드라인435헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 1,
      head: '헤드라인5헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 2,
      head: '헤드라인3헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 3,
      head: '헤드라인헤5드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 4,
      head: '헤드3라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 5,
      head: '헤드라4인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드3라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '헤드라4인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
    {
      id: 6,
      head: '2헤드라인헤드라인헤드라인헤드라인헤드라인',
      main: '메인이야',
      threeLine: '3줄요약',
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 't',
      isLike: 'f',
    },
  ];

  return (
    <div>
      <Header />
      <Navbar />
      <Content>
        <div className="wrap-vertical">
          <Tabbar type={0} />
        </div>
        {/* <hr /> */}
        {/* 여기 안에 페이지 제작 */}
        <div className="main">
          {newsInfo.map((news) => (
            <CardSlot />
          ))}
        </div>
      </Content>
    </div>
  );
}

export default Clicked;
