import { useEffect, useState } from 'react';
import styled from 'styled-components';

//아이콘 가져오기
import { AiOutlineClose } from 'react-icons/ai';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa6';

import { FaShare } from 'react-icons/fa6';

// cookies
import cookie from 'react-cookies';

// //axios
import { BaseInstance } from '../../hook/AxiosInstance';

// recoil
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

const Item = styled.div`
  color: #353845;
  text-align: left;
  font-size: 1.3rem;
  /* line-height: 2rem; */
  font-weight: bold;
  height: 30px;
  margin: 0;
  padding: 10px 0px 0 15px;

  cursor: pointer;

  .text {
    display: block;
    margin: 0px 20px 0px 15px;
    transform: translate(18%, -125%);

    font-size: 1rem;
  }

  a:hover {
    color: darkblue;
  }
`;

const Items = styled.div`
  border: 1px solid #9aa3aa;
  background-color: #ffffff;
  border-radius: 8px;
  width: 150px;
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
  //갱신용
  const [rander, setRander] = useState(true);

  const MyInfo = useRecoilValue(MyInfoAtom);

  function scrap() {
    if (MyInfo == 0) {
      alert('로그인 후 사용가능한 기능입니다.');
      return;
    }
    if (newsInfo.isScrap == 't') {
      newsInfo.isScrap = 'f';
      deleteAxios('/news/scrap');
    } else {
      newsInfo.isScrap = 't';
      getAxios('/news/scrap');
    }
    setRander(!rander);
  }

  function like() {
    if (MyInfo == 0) {
      alert('로그인 후 사용가능한 기능입니다.');
      return;
    }
    if (newsInfo.isLike == 't') {
      newsInfo.isLike = 'f';
      deleteAxios('/news/dibs');
    } else {
      newsInfo.isLike = 't';
      getAxios('/news/dibs');
    }
    setRander(!rander);
  }

  async function copyURL() {
    try {
      await navigator.clipboard.writeText(newsInfo.url);
      alert('복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  }

  function openNews() {
    window.open(newsInfo.url, '_blank', 'noopener, noreferrer');
  }

  // get
  async function getAxios(url) {
    const token = cookie.load('accessToken');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    await BaseInstance.get(`/api/${url}/${newsInfo.id}/${MyInfo}`, { headers })
      .then((response) => {
        if (response.data.statusCode === 200) {
        } else if (response.data.statusCode === 400) {
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  // delete
  async function deleteAxios(url) {
    const token = cookie.load('accessToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    await BaseInstance.delete(`/api/${url}/${newsInfo.id}/${MyInfo}`, {
      headers,
    })
      .then((response) => {
        if (response.data.statusCode === 200) {
        } else if (response.data.statusCode === 400) {
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  return (
    <div className="headerModal">
      <Items>
        <Item onClick={like}>
          {newsInfo.isLike == 't' ? <FaHeart /> : <FaRegHeart />}
          <span className="text">좋아요</span>
        </Item>
        <Item onClick={scrap}>
          {newsInfo.isScrap == 't' ? <FaBookmark /> : <FaRegBookmark />}
          <span className="text">스크랩</span>
        </Item>
        <Item onClick={copyURL}>
          <FaShare className="share" />
          <span className="text">URL 복사</span>
        </Item>
        <Item onClick={() => setCardModal(false)}>
          <AiOutlineClose className="close" />
          <span className="text">닫기</span>
        </Item>
      </Items>
    </div>
  );
}

export default CardModal;
