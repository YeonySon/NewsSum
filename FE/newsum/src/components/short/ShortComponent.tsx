import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
export const Short = styled.div`
  background-color: gray;

  align-items: center;
  width: 500px;

  @media (min-width: 700px) {
    .img {
      display: none;
    }
  }
`;
function ShortComponent({ shortInfo }) {
  const [items, setItems] = useState([]); // 렌더링할 아이템 리스트

  const [pages, setPages] = useState(1);

  function scrollToNextPage() {
    setPages(pages + 1);
  }

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      scrollToNextPage();
    }
  });

  return (
    <Short>
      <img src="shortInfo" alt="" />
      zzz
      <div className="sentinel">{shortInfo.head}</div>
    </Short>
  );
}

export default ShortComponent;
