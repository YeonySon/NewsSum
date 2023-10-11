import styled, { css } from "styled-components";

function EmptyComponent({ type }) {

  return(
    <ImgContainer $type={ type }>
      {type === 1 && 
        (<>
          <img src={`${process.env.PUBLIC_URL}/img/page/noData.jpg`} alt="logo" />
          <p>데이터가 존재하지 않습니다.</p>
        </>)
      }
      {type === 2 && 
        (<>
          <img src={`${process.env.PUBLIC_URL}/img/page/img2.jpg`} alt="logo" />
        </>)
      }
    </ImgContainer>
  )
};

export default EmptyComponent;


interface ImgType {
  $type: number;
}

export const ImgContainer = styled.div<ImgType>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 400px;
    height: auto;
  }

  p {
    font-weight: 600;
    font-size: 18px;
    color: #9292cb;
  }

  ${({ $type }) => $type === 1 ? 
    css`
      opacity: 0.75;
      img {
        margin-top: 50px;
      }
    ` : 
    css`
      opacity: 0.5;
      img {
        margin-top: -70px;
      }
    `}

  @media (max-width: 700px) {
    img {
      margin-right: 1%;
      width: 250px;
    }
  }
`
