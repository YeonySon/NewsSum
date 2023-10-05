import { useState } from 'react';
import styled from 'styled-components';

const TabBar = styled.div`
  /* width: max-content;
  overflow: scroll;

  
  &::-webkit-scrollbar {
    display: none;
  } */
`;

export const Active = styled.div`
  color: #ffffff;
  background-color: #3cb4fc;
  border: 1px solid #9aa3aa;
  border-radius: 8px;

  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: 500;

  text-align: center;
  //font-size: 23px;
  height: 30px;
  min-width: 12px;
  display: inline-block;
  padding: 0 12px;
  margin: 3px 6px;
  cursor: pointer;
`;

export const ActiveDark = styled.div`
  color: #ffffff;
  background-color: #394867;
  border: 1px solid #9aa3aa;
  border-radius: 8px;

  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: 500;

  text-align: center;
  //font-size: 23px;
  height: 30px;
  min-width: 12px;
  display: inline-block;
  padding: 0 12px;
  margin: 3px 6px;
  cursor: pointer;
`;

export const Deactive = styled.div`
  color: #353845;
  background-color: #ffffff;
  border: 1px solid #9aa3aa;
  border-radius: 8px;

  font-family: 'Roboto', 'Arial', sans-serif;
  font-size: 0.9rem;
  line-height: 2rem;
  font-weight: 500;

  text-align: center;
  //font-size: 23px;
  height: 30px;
  min-width: 12px;
  display: inline-block;
  padding: 0 12px;
  margin: 3px 6px;

  &:hover {
    color: #000000;
    background-color: #e1e9ef;
    cursor: pointer;
  }
`;

function Tabbar({ type = 0 }) {
  //무슨 페이지인지 확인
  // const [type, setType] = useState(0);

  const nav = [
    ['추천', '전체', '모바일', '인터넷/sns', 'it/일반', '보안/해킹'],
    ['분석', '뉴스', '키워드', '내정보'],
    ['인기', '최신'],
    ['최근 본 뉴스', '스크랩 한 뉴스'],
    ['희망 직무', '관심 기업'],
  ];

  const [title, setTitle] = useState(nav[type][0]);
  return (
    <div>
      <TabBar>
        {nav[type].map((manu) =>
          manu == title ? (
            type > 2 ? (
              <ActiveDark>{manu}</ActiveDark>
            ) : (
              <Active>{manu}</Active>
            )
          ) : (
            <Deactive onClick={() => setTitle(manu)}>{manu}</Deactive>
          )
        )}
      </TabBar>
    </div>
  );
}

export default Tabbar;
