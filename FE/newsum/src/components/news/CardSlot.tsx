import { useState } from 'react';
import styled from 'styled-components';
//아이콘 가져오기
import { CiMenuKebab } from 'react-icons/ci';
import { FaBookmark, FaRegBookmark, FaEye, FaHeart, FaRegHeart } from 'react-icons/fa6';

//modal import
import CardModal from './CardModal';

const Card = styled.div`
  background-color: gray;
  position: relative;

  width: 500px;
  height: 380px;

  .card-img {
    border-radius: 10px;
    width: 500px;
    height: 250px;
  }
`;

const Deactive = styled.div``;

function CardSlot() {
  //무슨 페이지인지 확인
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('추천');

  const [scrap, setScrap] = useState(false);
  const [like, setLike] = useState(false);
  const [cardModal, setCardModal] = useState(true);

  const newsInfo = {
    id: 1,
    head: '헤드라인',
    main: '메인이야',
    threeLine: '3줄요약',
    url: 'https://www.',
    postedDate: '2023.09.13',
    mediaName: '중앙일보',
    mediaImage: 'https://www',
    image: 'https://velog.velcdn.com/images/dailylifecoding/post/96ae60b7-9c5a-4ef8-a379-8a9f85745bf0/image.png',
    viewCnt: 12,
    cgName: '모바일',
    likeCnt: 12,
    scrapCnt: 22,
    isScrap: 't',
    isLike: 'f',
  };

  function openNews() {
    alert(`조회수 올리기`);
    alert(`새 창에서 뉴스 열기`);
    window.open(newsInfo.url, '_blank', 'noopener, noreferrer');
  }

  return (
    <div>
      <Card>
        <img onClick={openNews} className="card-img" src={newsInfo.image} />
        <div className="card-head">{newsInfo.head}</div>
        <div>{newsInfo.postedDate}</div>
        <img src={newsInfo.mediaImage} alt={newsInfo.mediaName} />
        <div>
          {newsInfo.isLike == 't' ? <FaHeart /> : <FaRegHeart />}

          {newsInfo.likeCnt}
          {newsInfo.isScrap == 't' ? <FaBookmark /> : <FaRegBookmark />}

          {newsInfo.scrapCnt}
          <FaEye />
          {newsInfo.viewCnt}
        </div>

        <div onClick={() => setCardModal(true)}>
          <CiMenuKebab />
          모달열기
        </div>

        {cardModal && (
          <CardModal newsInfo={newsInfo} setLike={setLike} setScrap={setScrap} setCardModal={setCardModal} />
        )}
        <hr />
      </Card>
    </div>
  );
}

export default CardSlot;
