import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

//아이콘 가져오기
import { IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { FaShare } from 'react-icons/fa6';

export const Short = styled.div`
  background-color: #ebf3f8;

  align-items: center;
  width: 400px;
  min-height: 600px;

  border-radius: 10px;
  margin: 0 0 10px 0;

  padding: 10px 10px 10px 10px;

  position: relative;

  .short-img {
    width: 340px;
    height: 150px;
    object-fit: cover;

    margin: 30px 30px 0px 30px;

    border-radius: 10px;
  }

  .short-head {
    font-size: 2rem;
    font-weight: bold;

    margin: 20px 20px 15px 20px;

    /* overflow: auto; */
    word-break: break-all;
  }

  .short-threeLine {
    background-color: #ebf3f8;
    word-break: break-all;
    white-space: pre-wrap;

    width: 340px;

    margin: 0 30px 100px 30px;
    border-radius: 10px;
  }
  @media (max-width: 700px) {
    min-height: 520px;
    margin: 0 0 0 0;
    .short-img {
      display: none;
    }
  }
`;

export const ShortMenu = styled.div`
  position: absolute;
  display: flex;

  color: #394867;

  height: 300px;

  top: 50%;
  left: 105%;
  flex-direction: column;
  justify-content: space-between;

  font-size: 2.2rem;
  .text {
    font-size: 1.1rem;
    position: absolute;
    white-space: nowrap;

    overflow: visible;
    transform: translate(-70%, 170%);

    font-weight: bold;

    /* left: -0%; */
  }
  @media (max-width: 700px) {
    top: 100%;
    left: 10%;

    transform: translate(0, -80px);

    width: 330px;
    height: 100px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

function ShortComponent({ shortInfo }) {
  async function copyURL() {
    try {
      await navigator.clipboard.writeText(shortInfo.url);
      alert('복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  }

  function scrap() {
    alert('스크랩');
  }

  function like() {
    alert('좋아요');
  }
  return (
    <Short>
      <img className="short-img" src={shortInfo.image} alt={shortInfo.head} />

      <div className="short-head">{shortInfo.head}</div>
      <div className="short-threeLine">{shortInfo.threeLine}</div>
      <ShortMenu>
        <div onClick={like}>
          {shortInfo.isLike == 't' ? <FaHeart /> : <FaRegHeart />}
          <span className="text">좋아요</span>
        </div>
        <div onClick={scrap}>
          {shortInfo.isScrap == 't' ? <FaBookmark /> : <FaRegBookmark />}
          <span className="text">스크랩</span>
        </div>
        <div onClick={copyURL}>
          <IoDocumentTextOutline className="close" />
          <span className="text">원문 보기</span>
        </div>
        <div onClick={copyURL}>
          <FaShare className="share" />
          <span className="text">URL 복사</span>
        </div>
      </ShortMenu>
    </Short>
  );
}

export default ShortComponent;
