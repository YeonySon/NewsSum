import styled, { css } from "styled-components";

interface IsVisible {
  $isActive: boolean;
}

export const WordCloudContainer = styled.div<IsVisible>`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  align-items: center;
  gap: 30px;

  @media (max-width: 700px) {
    
    flex-direction: column;
    justify-content: flex-start;
    ${({ $isActive }) => $isActive ? 
      css`
        position: relative;
        visibility: visible;
      ` : 
      css`
        position: absolute;
        visibility: hidden;
        top:0;
      `}
  }
`

export const WordCloudBox = styled.div`
  width: 600px;
  height: 300px;
`


export const WordCloudTable = styled.div`
  padding-left: 30px;
  p {
    font-weight: bold;
    padding-bottom: 5px;
  }
`

export const GraphPage = styled.div<IsVisible>`
  width: auto;
  height: 300px;
  visibility: visible;
  display: flex;
  align-items: center;

  @media (max-width: 700px) {
    height: 300px;
    flex-direction: column;
    ${({ $isActive }) => $isActive ? 
      css`
        position: relative;
        visibility: visible;
      ` : 
      css`
        position: absolute;
        visibility: hidden;
        top:0;
      `}
  }
`

export const GraphBox = styled.div`
  position: relative;
  height: 250px;
  /* height: 300px; */
  margin: 0px 30px 0px;

  p {
    margin: 0px;
    font-weight: bold;
    font-size: 17px;
  }

  @media (max-width: 700px) {
    p {
      display: none;
    }
  }
`

// RadarChart, VerticalChart용 Table
export const TableBox = styled.div`
  p {
    font-weight: bold;
    padding-bottom: 5px;
  }

  table {
    width: 100px;
    border-spacing: 0;
    border-collapse: collapse;
    border-top: 2px solid #444444;
    border-bottom: 2px solid #444444;
  }

  tr {
    border-bottom: 1px solid #444444;
  }

  td {
    padding: 5px;
    border-top: 1px solid #444444;
    border-bottom: 1px solid #444444;
  }
`

// DivLine
export const DivColLine = styled.div`
  height: 95%;
  width: 1px;
  margin: 0px 5px 0px 30px;;
  background-color: #D9D9D9;

  @media (max-width: 700px) {
    display: none;
  }
`