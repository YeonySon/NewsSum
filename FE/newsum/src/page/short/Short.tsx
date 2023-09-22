import { useState } from 'react';
import styled from 'styled-components';

// component import
import Header from '../../components/util/Header';
import Navbar from '../../components/util/Navbar';
import Tabbar from '../../components/util/Tabbar';

export const Content = styled.div`
  background-color: lightblue;
  width: 100%;
  //700px 보다 클 때
  @media (min-width: 700px) {
    position: absolute;
    top: 60px;
    left: 25%;

    width: 75%;
  }
`;

function Short() {
  return (
    <div>
      <Header />
      <Navbar />
      <Content>
        <div>
          <Tabbar />
          <hr />
        </div>
        {/* 여기 안에 페이지 제작 */}
        <div>
          zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
          <br />
          sddssfdsdf
        </div>
      </Content>
    </div>
  );
}

export default Short;
