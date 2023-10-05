import React from "react";
import { useEffect, useState } from "react";

import { WordCloudTable } from "./visuallization/GraphStyle";
import styled from "styled-components";

const TableItem = styled.table`
  width: 200px;
  border-top: 2px solid #444444;
  border-bottom: 2px solid #444444;
  border-collapse: collapse;

  tr {
    /* min-width: 5px; */
    border-bottom: 1px solid #444444;
    /* border: 1px solid #444444; */
  }

  td {
    width: auto;
  }

  td.index {
    width: 25px;
    padding-left: 10px;
  }
`;

function Table({ list, keywordList }) {
  return (
    <WordCloudTable>
      <p>뉴스키워드분석</p>
      <TableItem>
        {list.map((li, index) =>
          index < 10 ? (
            <tr>
              <td className="index">{index + 1}</td>
              <td>{keywordList ? li.name : li.cgName}</td>
              <td>{keywordList ? li.cnt : li.cnt}</td>
            </tr>
          ) : null
        )}
      </TableItem>
    </WordCloudTable>
  );
}

export default Table;
