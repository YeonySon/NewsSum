import { useState } from 'react';
import styled from 'styled-components';
//아이콘 가져오기
import { CiMenuKebab } from 'react-icons/ci';
import { FaBookmark, FaRegBookmark, FaEye, FaHeart, FaRegHeart } from 'react-icons/fa6';

//modal import
import CardModal from './CardModal';

const Card = styled.div`
  /* background-color: gray; */
  position: relative;

  width: 370px;
  height: 340px;

  .card-img {
    border-radius: 10px;
    width: 370px;
    height: 210px;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
  }
  .card-head .text {
    display: block;
    height: 2rem;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    /* word-break: break-all; */
  }
  .info {
    font-size: 1rem;
    display: flex;
    justify-content: end;
    margin: 15px 20px 5px;
  }
  .num {
    transform: translate(0, -20%);
    margin: 0 10px 0 5px;
  }

  .data {
    display: flex;
    justify-content: space-between;
    text-align: left;
  }

  .media {
    display: flex;
    justify-content: end;
    flex-direction: column;
    margin: 0 0 3px 10px;
  }
  .media img {
    height: 3rem;
  }
  .date {
    text-align: right;
    margin: 0 0 0 0;
  }
`;

const Deactive = styled.div``;

function CardSlot({ newsInfo }) {
  //무슨 페이지인지 확인
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('추천');

  const [scrap, setScrap] = useState(false);
  const [like, setLike] = useState(false);
  const [cardModal, setCardModal] = useState(false);

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

        {/* 기타정보 */}
        <div className="data">
          <div className="media">
            <img src={newsInfo.mediaImage} alt={newsInfo.mediaName} />
          </div>
          <div>
            {/* 조회수 등 */}
            <div className="info">
              {newsInfo.isLike == 't' ? <FaHeart /> : <FaRegHeart />}
              <span className="num">{newsInfo.likeCnt}</span>
              {newsInfo.isScrap == 't' ? <FaBookmark /> : <FaRegBookmark />}
              <span className="num">{newsInfo.scrapCnt}</span>
              <FaEye />
              <span className="num">{newsInfo.viewCnt}</span>
            </div>
            {/* 날자 */}
            <div className="date">{newsInfo.postedDate}</div>
          </div>
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
