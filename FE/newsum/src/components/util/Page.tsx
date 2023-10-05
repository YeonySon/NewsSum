import styled from 'styled-components';

//redux
import React, { useEffect, useState } from 'react';

function Pagination({ total, limit, page, setPage }) {
  useEffect(() => {
    //회원 follow목록 가져오기
  }, [page]);

  const numPages = Math.ceil(total);

  return (
    <>
      <Nav>
        <Button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 0}
        >
          &lt;
        </Button>
        {numPages > 0 &&
          Array(numPages)
            .fill()
            .map((_, i) => (
              <Button
                key={i + 1}
                onClick={() => {
                  setPage(i);
                }}
                aria-current={page === i ? 'page' : null}
              >
                {i + 1}
              </Button>
            ))}
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === numPages - 1}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #eaa595;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
