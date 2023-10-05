import { useState } from 'react';
import styled from 'styled-components';
//아이콘 가져오기
import { CiMenuKebab } from 'react-icons/ci';
import { FaBookmark, FaRegBookmark, FaEye, FaHeart, FaRegHeart } from 'react-icons/fa6';

//modal import
import CardModal from './CardModal';

// cookies
import cookie from 'react-cookies';

// //axios
import { BaseInstance } from '../../hook/AxiosInstance';

// recoil
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

const Card = styled.div`
  /* background-color: gray; */
  position: relative;

  width: 330px;
  height: 350px;
  margin: 0 0 0 40px;

  .card-img {
    border-radius: 10px;
    width: 330px;
    height: 230px;
    object-fit: cover;

    cursor: pointer;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    font-size: 1.25rem;
  }
  .card-head .text {
    display: block;
    height: 2rem;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
    /* word-break: break-all; */

    cursor: pointer;
  }
  .info {
    font-size: 1rem;
    display: flex;
    justify-content: end;
    margin: 15px 0px 5px;
  }
  .info svg {
    margin: 0 0 0 10px;
  }
  .num {
    transform: translate(0, -20%);
    margin: 0 0px 0 5px;
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
    height: 1.7rem;
  }
  .date {
    text-align: right;
    margin: 0 0 0 0;
  }

  hr {
    margin-top: 10px;
  }
`;

const Deactive = styled.div``;

function CardSlot({ newsInfo, isRecom }) {
  //무슨 페이지인지 확인
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('추천');

  const [scrap, setScrap] = useState(false);
  const [like, setLike] = useState(false);
  const [cardModal, setCardModal] = useState(false);

  const MyInfo = useRecoilValue(MyInfoAtom);

  function openNews() {
    details();
    window.open(newsInfo.url, '_blank', 'noopener, noreferrer');
  }

  // 원문보기
  const details = async () => {
    const requestBodyJSON = JSON.stringify({
      userId: MyInfo,
      newsId: newsInfo.id,
      isRecom: isRecom,
    });

    const token = cookie.load('accessToken');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Beare ' + token,
    };
    await BaseInstance.post(`/api/news/detail`, requestBodyJSON, { headers })
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          console.log('200');
        } else if (response.data.statusCode === 400) {
          console.log('400');
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  return (
    <div>
      <Card>
        <img onClick={openNews} className="card-img" src={newsInfo.image} />
        {/* 첫 줄 : 기사 제목, 모달 버튼 */}
        <div className="card-head">
          <div className="text" onClick={openNews}>
            {newsInfo.head}
          </div>
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
