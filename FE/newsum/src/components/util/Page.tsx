import styled from "styled-components";

//redux
import React, { useEffect, useState } from "react";

function Pagination({ total, limit, page, setPage }) {
  useEffect(() => {
    console.log(page);
    console.log(pageCt);
  }, [page]);

  const pageCt = Math.floor(page / limit);
  const pageNo = page % limit;

  // const numPagesMin;
  // const numPagesMax;

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
        {total > 0 &&
          Array(limit)
            .fill()
            .map(
              (_, i) =>
                total >= i + 1 + limit * pageCt && (
                  <Button
                    key={i + 1 + limit * pageCt}
                    onClick={() => {
                      setPage(i + limit * pageCt);
                    }}
                    aria-current={pageNo === i ? "page" : null}
                  >
                    {i + 1 + limit * pageCt}
                  </Button>
                )
            )}
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page >= total - 1}
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
