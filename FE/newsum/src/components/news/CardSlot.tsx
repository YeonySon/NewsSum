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

  .card-head {
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
  }
  .card-head .text {
    display: block;
    height: 2.5rem;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    /* word-break: break-all; */
  }
  .info {
    font-size: 1.2rem;
    display: flex;
    justify-content: end;
  }

  .data {
    display: flex;
    justify-content: space-between;
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
    head: '헤드라인헤드라인헤드라인헤드라인헤드라인',
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
        {/* 첫 줄 : 기사 제목, 모달 버튼 */}
        <div className="card-head">
          <div className="text">{newsInfo.head}</div>
          <div onClick={() => setCardModal(true)}>
            <CiMenuKebab />
          </div>
        </div>

        {/* 두번째 줄 */}
        <div className="info">
          {newsInfo.isLike == 't' ? <FaHeart /> : <FaRegHeart />}

          {newsInfo.likeCnt}
          {newsInfo.isScrap == 't' ? <FaBookmark /> : <FaRegBookmark />}

          {newsInfo.scrapCnt}
          <FaEye />
          {newsInfo.viewCnt}
        </div>
        <div className="data">
          <img src={newsInfo.mediaImage} alt={newsInfo.mediaName} />
          <div>{newsInfo.postedDate}</div>
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
