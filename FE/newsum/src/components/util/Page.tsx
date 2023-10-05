import styled from 'styled-components';

//redux
import React, { useEffect, useState } from 'react';

function Pagination({ total, limit, page, setPage }) {
  useEffect(() => {
    console.log(page);
  }, [page]);

  const numPages = Math.ceil(total / limit);

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
  border: 1px solid #9aa3aa;

  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background-color: white;
  color: #394867;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    background-color: #7487ae;
    color: white;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background-color: white;
    color: #9aa3aa;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #394867;
    color: white;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
