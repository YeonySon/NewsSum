import { useState } from 'react';
import styled from 'styled-components';

// //axios
import { BaseInstance } from '../../hook/AxiosInstance';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar from '../../components/util/Tabbar';

//Short compoent import
import ShortComponent from '../../components/short/ShortComponent';

export const Content = styled.div`
  border-left: 0;
  /* background-color: lightblue; */
  width: 100%;
  margin: 0;

  .main {
    /* background-color: #788ca8; */

    display: flex;
    flex-direction: column;
    position: relative;
    margin: 30px auto 100px auto;

    width: 400px;

    /* width: 300; */
  }

  //700px 보다 클 때
  @media (min-width: 700px) {
    position: absolute;
    top: 60px;
    left: 17%;

    height: calc(100% - 60px);
    width: 80%;
    max-width: 1600px;

    border-left: 1px solid gray;
    .main {
    }
  }
`;

function News() {
  // const newsInfo = [
  //   {
  //     id: 1,
  //     head: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
  //     main: '메인이야',
  //     threeLine: `
  //     국내 유료방송 시장에서 '코드커터(유료방송 해지)'
  //     현상은 낮은 요금과 초고속 인터넷 결합에 영향으로현상은 낮은 요금과 초고속 인터넷 결합에 영향으로
  //     나타나지만,
  //     1인가구 증가와 결혼율 하락세로 장기적으로는
  //     어둡게 예상되며, 유료방송 산업도 위기를 맞고 있어
  //     전략적 대비가 필요합니다.

  //     OTT 환경의 확산으로 인해
  //     유료방송 산업이 국경을 넘어서며, 홈쇼핑
  //     송출수수료 갈등과 수익 감소로 인해 유료방송의
  //     미래가 불투명하고 위기에 처해 있습니다.

  //     코드네버와 코드커터 현상이
  //     유료방송 산업을 변화시킬 가능성이 높습니다.`,
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 'f',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 2,
  //     head: '2',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 't',
  //   },
  //   {
  //     id: 3,
  //     head: '3',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 4,
  //     head: '4',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 5,
  //     head: '5',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '6',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '7',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '8',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 1,
  //     head: '9',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 2,
  //     head: '0',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 3,
  //     head: '11',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 4,
  //     head: '12',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 5,
  //     head: '13',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '14',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '15',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '16',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 1,
  //     head: '17',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 2,
  //     head: '18',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 3,
  //     head: '9',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 4,
  //     head: '90',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 5,
  //     head: '12',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '22',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '23',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '24',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 1,
  //     head: '25',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 2,
  //     head: '37',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 3,
  //     head: '38',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 4,
  //     head: '36',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 5,
  //     head: '9',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '0',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '111',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  //   {
  //     id: 6,
  //     head: '222',
  //     main: '메인이야',
  //     threeLine: '3줄요약',
  //     url: 'https://www.',
  //     postedDate: '2023.09.13',
  //     mediaName: '중앙일보',
  //     mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
  //     viewCnt: 12,
  //     cgName: '모바일',
  //     likeCnt: 12,
  //     scrapCnt: 22,
  //     isScrap: 't',
  //     isLike: 'f',
  //   },
  // ];
  const [newsInfo, setNewsInfo] = useState([]);
  const [items, setItems] = useState(0); // 렌더링할 아이템 리스트

  const [pages, setPages] = useState(1);

  function scrollToNextPage() {
    if (newsInfo.length - 1 > pages) {
      setPages(pages + 1);
    } else {
      getShortList();
      setPages(0);
      console.log('새로운 쇼츠 목록 요청');
    }
  }

  function scrollToPrevPage() {
    if (pages > 0) {
      setPages(pages - 1);
    }
  }

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      scrollToNextPage();
    } else {
      scrollToPrevPage();
    }
  });

  // 쇼츠 리스트 가져오기
  async function getShortList() {
    // 서버에 요청
    BaseInstance.get(`/news/recommend/shorts`, { headers: {} })
      .then((response) => {
        if (response.data.statusCode === 200) {
          console.log(response.data.data);
        } else {
          console.log('error');
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getShortList();

  return (
    <div>
      <Header />
      <Navbar nav={'short'} />
      <Content>
        {/* <hr /> */}
        {/* 여기 안에 페이지 제작 */}
        <div className="main">{/* <ShortComponent shortInfo={newsInfo[pages]} /> */}</div>
      </Content>
    </div>
  );
}

export default News;
