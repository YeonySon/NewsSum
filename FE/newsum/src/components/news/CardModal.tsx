import { useEffect, useState } from 'react';
import styled from 'styled-components';

//아이콘 가져오기
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa6';

import { PiShareFat } from 'react-icons/pi';

const Item = styled.div`
  color: #353845;
  text-align: left;
  font-size: 1.2rem;
  line-height: 2rem;
  font-weight: bold;
  height: 40px;
  margin: 0;
  padding: 10px 0px 0 50px;

  a:hover {
    color: darkblue;
  }
`;

const Items = styled.div`
  border: 1px solid #9aa3aa;
  background-color: #ffffff;
  border-radius: 8px;
  width: 200px;
  margin: 0;
  padding: 0;

  box-shadow: 0px 0px 0px 0px #636363;

  /* 프로필 아이콘 밑으로 이동 */
  position: absolute;
  top: 100%;
  left: 100%;
  transform: translate(-105%, -105%);

  z-index: 10;
`;

function CardModal({ newsInfo, setScrap, setLike, setCardModal }) {
  //카드 뉴스 정보 확인

  async function copyURL() {
    try {
      await navigator.clipboard.writeText(newsInfo.url);
      alert('복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  }

  function scrap() {
    alert('스크랩');
    setScrap(!newsInfo);
  }

  function like() {
    alert('좋아요');
    setLike(!newsInfo);
  }

  return (
    <div className="headerModal">
      <Items>
        <Item onClick={like}>
          {newsInfo.isLike == 't' ? <FaHeart /> : <FaRegHeart />}
          좋아요
        </Item>
        <Item onClick={scrap}>
          {newsInfo.isScrap == 't' ? <FaBookmark /> : <FaRegBookmark />}
          스크랩
        </Item>
        <Item onClick={copyURL}>
          <PiShareFat />
          URL 복사
        </Item>
        <Item onClick={() => setCardModal(false)}>
          <AiOutlineCloseCircle />
          닫기
        </Item>
      </Items>
    </div>
  );
}

export default CardModal;
