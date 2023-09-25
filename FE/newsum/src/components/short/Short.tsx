import React, { useState, useEffect, useRef } from 'react';
// import './InfiniteScroll.css'; // 필요에 따라 스타일을 추가하세요.

function ShortComponent() {
  const [items, setItems] = useState([]); // 렌더링할 아이템 리스트

  const [pages, setPages] = useState(1);

  function scrollToNextPage() {
    setPages(pages + 1);
  }

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      scrollToNextPage();
    }
    // console.log(event.deltaY);
  });

  return (
    <div className="infinite-scroll-container">
      {pages}
      {items.map((item, index) => (
        <div key={index} className="item">
          {/* 여기에 각 항목을 렌더링하는 UI를 작성하세요. */}
          {item}
        </div>
      ))}

      <div className="sentinel"></div>
    </div>
  );
}

export default ShortComponent;
