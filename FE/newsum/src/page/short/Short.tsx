import { useEffect, useState } from 'react';
import styled from 'styled-components';

// cookies
import cookie from 'react-cookies';

// recoil
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';

// //axios
import { BaseInstance } from '../../hook/AxiosInstance';

//Util component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar from '../../components/util/Tabbar';

//Short compoent import
import ShortComponent from '../../components/short/ShortComponent';

export const Content = styled.div`
  border-left: 0;
  /* background-color: lightblue; */
  width: 100%;
  margin: 0;

  .main {
    /* background-color: #788ca8; */

    display: flex;
    flex-direction: column;
    position: relative;
    margin: 30px auto 100px auto;

    width: 400px;

    /* width: 300; */
  }

  //700px 보다 클 때
  @media (min-width: 700px) {
    position: absolute;
    top: 60px;
    left: 17%;

    height: calc(100% - 60px);
    width: 80%;
    max-width: 1600px;

    border-left: 1px solid gray;
    .main {
    }
  }
`;

function News() {
  //page
  const [pages, setPages] = useState(0);
  // let newsInfo = [];
  const [newsInfo, setNewsInfo] = useState([]);
  // const [items, setItems] = useState(0); // 렌더링할 아이템 리스트

  const MyInfo = useRecoilValue(MyInfoAtom);
  const setMyinfo = useSetRecoilState(MyInfoAtom);

  function scrollToNextPage() {
    setPages(pages + 1);
  }

  function scrollToPrevPage() {
    if (pages >= 0) {
      setPages(pages - 1);
    }
  }

  window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      scrollToNextPage();
    } else {
      scrollToPrevPage();
    }
  });

  // 쇼츠 리스트 가져오기
  async function getShortList() {
    // const requestBodyJSON = JSON.stringify(requestBody);

    const token = cookie.load('accessToken');
    // if (token == undefined) {
    //   setMyinfo(0);
    //   return;
    // }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Beare ' + token,
    };
    console.log('myinfo : ');
    console.log(MyInfo);

    await BaseInstance.get(`/api/news/recommend/${MyInfo}`, { headers })
      .then((response) => {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          console.log('200');
          console.log(response.data);
          // newsInfo = response.data.data;
          // newsInfo = dummy;

          setNewsInfo(response.data.data);
          // setNewsInfo(dummy);
        } else if (response.data.statusCode === 400) {
          console.log('400');
          console.log(response.data);
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  //page 갱신
  useEffect(() => {
    console.log('pages');
    console.log(pages);

    if (pages >= newsInfo.length - 1) {
      getShortList();
      setPages(0);
    }
  }, [pages]);

  return (
    <div>
      <Header />
      <Navbar nav={'short'} />
      <Content>
        {/* <hr /> */}
        {/* 여기 안에 페이지 제작 */}
        <div className="main">
          {/* {MyInfo} */}
          {newsInfo.length != 0 ? <ShortComponent shortInfo={newsInfo[pages]} /> : <div>비었습니다</div>}
        </div>
      </Content>
    </div>
  );
}

export default News;
