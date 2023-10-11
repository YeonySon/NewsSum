import React, { useState } from 'react';
import ReactWordcloud from 'react-wordcloud';
import Table from '../Table';

import { DivColLine, WordCloudContainer, WordCloudBox } from './GraphStyle';

function  WordCloud({ data, isActive }) {

  return (
    <WordCloudContainer $isActive={isActive}>
      <WordCloudBox>
        <ReactWordcloud
          words={data.keywordlist.map((li) => ({
            text: li.name,
            value: li.cnt,
          }))}
        />
      </WordCloudBox>
      <DivColLine />
      <Table list={data.keywordlist} keywordList={true} />
    </WordCloudContainer>
  )
}

export default WordCloud;