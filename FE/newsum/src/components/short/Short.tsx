import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Short = styled.div`
  background-color: gray;

  position: absolute;

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  height: 500px;
  width: 300px;

  @media (max-width: 700px) {
    .img {
      display: none;
    }
  }
`;

function ShortComponent() {
  const [isNavOn, setIsNavOn] = useState(true);
  //이전 스크롤 초기값
  const beforeScrollY = useRef(0);
  
    useEffect(() => {
      window.addEventListener("scroll", scrollEvent);
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, [isLoggedIn, setIsLoggedIn, token]);
  
    const scrollEvent = useMemo(
      () =>
        throttle(() => {
          const currentScrollY = window.scrollY;
          if (beforeScrollY.current < currentScrollY) {
            setIsNavOn(false);
            console.log("내림");
          } else {
            setIsNavOn(true);
            console.log("올림");
          }
          //이전 스크롤값 저장
          beforeScrollY.current = currentScrollY;
        }, 300),
      [beforeScrollY]
    );
  return(
    <div className={isNavOn ? "main__first" : "main__first hidden"}>

  return (
    <div>
      <Short>
        <img className="img" src="" alt="" />
        <div className="title">{`title`}</div>
        <div className="line3">{`line3`}</div>
      </Short>
    </div>
  );
}

export default ShortComponent;
