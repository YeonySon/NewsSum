import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar, { Active, ActiveDark, Deactive } from '../../components/util/Tabbar';
import cookie from 'react-cookies';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/mypage/Dropdown';
import CardSlot from '../../components/news/CardSlot';
import { useRecoilValue } from 'recoil';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';
import { BaseInstance } from '../../hook/AxiosInstance';

export const Content = styled.div`
  border-left: 0;
  /* background-color: lightblue; */
  width: 100%;
  margin: 0;

  .wrap-vertical {
    margin: 15px 0px 0px 0px;
    padding: 5px 0 5px 20px;
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
    margin: 30px 0 0 0;

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

    .wrap-vertical {
      margin-left: 20px;
    }
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
    margin: 20px 0px 0px 10px;
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
      Authorization: 'Beare ' + token,
    };
    await BaseInstance.get(url, { headers })
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          console.log('200');
          console.log(response.data);
          setNewsInfo(response.data.data);
          setNewsInfo(dummy);
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

  const dummy = [
    {
      id: 1,
      head: '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      main: '메인이야',
      threeLine: `
      국내 유료방송 시장에서 '코드커터(유료방송 해지)'
      현상은 낮은 요금과 초고속 인터넷 결합에 영향으로현상은 낮은 요금과 초고속 인터넷 결합에 영향으로
      나타나지만,
      1인가구 증가와 결혼율 하락세로 장기적으로는
      어둡게 예상되며, 유료방송 산업도 위기를 맞고 있어
      전략적 대비가 필요합니다.

      OTT 환경의 확산으로 인해
      유료방송 산업이 국경을 넘어서며, 홈쇼핑
      송출수수료 갈등과 수익 감소로 인해 유료방송의
      미래가 불투명하고 위기에 처해 있습니다.

      코드네버와 코드커터 현상이
      유료방송 산업을 변화시킬 가능성이 높습니다.`,
      url: 'https://www.',
      postedDate: '2023.09.13',
      mediaName: '중앙일보',
      mediaImage: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
      viewCnt: 12,
      cgName: '모바일',
      likeCnt: 12,
      scrapCnt: 22,
      isScrap: 'f',
      isLike: 'f',
    },
    {
      id: 2,
      head: '2',
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
      isLike: 't',
    },
    {
      id: 3,
      head: '3',
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
      head: '4',
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
      head: '5',
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
      head: '6',
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
      head: '7',
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
      head: '8',
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
      head: '9',
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
      head: '0',
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
      head: '11',
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
      head: '12',
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
      head: '13',
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
      head: '14',
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
      head: '15',
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
      head: '16',
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
      head: '17',
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
      head: '18',
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
      head: '9',
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
      head: '90',
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
      head: '12',
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
      head: '22',
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
      head: '23',
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
      head: '24',
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
      head: '25',
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
      head: '37',
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
      head: '38',
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
      head: '36',
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
      head: '9',
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
      head: '0',
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
      head: '111',
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
      head: '222',
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

  const tab = [
    ['최근 본 뉴스', -1],
    ['스크랩 전체', 0],
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
      getNews(`/news/recommend/${MyInfo}`);
    } else if (sort != -1) {
      getNews(`/news/${MyInfo}/sort?category=${sort}&option=${sortAli}`);
    }
  }, [sort, sortAli]);

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
          {tab.map((manu) =>
            manu[1] == sort ? (
              <ActiveDark>{manu[0]}</ActiveDark>
            ) : (
              <Deactive onClick={() => clickedSort(manu[1])}>{manu[0]}</Deactive>
            )
          )}
        </div>
        <div className="wrap-vertical">
          {sort != -1 && <Dropdown sortAli={sortAli} setSortAli={setSortAli} ali={ali} />}
        </div>
        {/* 여기 안에 페이지 제작 */}
        <div className="main">
          {newsInfo.map((news) => (
            <CardSlot newsInfo={news} />
          ))}
        </div>
      </Content>
    </div>
  );
}

export default MyNews;
