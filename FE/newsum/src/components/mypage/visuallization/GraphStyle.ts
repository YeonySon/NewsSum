import styled, { css } from "styled-components";


export const GraphPage = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  align-items: center;
  gap: 30px;
`

export const TableBox = styled.div`
  p {
    font-weight: bold;
    padding-bottom: 5px;
  }

  table {
    width: 100px;
    /* border: 1px solid #ddd; */
    border-spacing: 0;
    border-collapse: collapse;
  }
  td {
    padding: 5px;
    border-top: 1px solid #36404A;
    border-bottom: 1px solid #36404A;
  }
`