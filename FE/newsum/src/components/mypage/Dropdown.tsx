import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
// import { MyInfoAtom } from '../../recoil/atoms/MyInfoAtom';
// import { LoginModalIsOpenAtom } from '../../recoil/atoms/LoginModalAtom';

//icons
import { BiSortDown } from 'react-icons/bi';
export const Item = styled.div`
  color: #353845;
  text-align: left;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: bold;
  height: 20px;
  margin: 0;
  padding: 10px 0 5px 0;

  cursor: pointer;

  a:hover {
    color: darkblue;
  }
  span {
    margin: 0;
    padding: 0;
    font-size: 1.1rem;
    /* padding-bottom: 10px; */
  }

  span.icon {
    font-size: 1rem;
  }
`;

export const Items = styled.div`
  border: 2px solid #9aa3aa;
  background-color: #ffffff;
  border-radius: 2px;
  width: 110px;
  margin: 0 0 20px 0;
  padding: 0 0 0 10px;

  /* box-shadow: 2px 2px 1px 2px #f8f8f8; */

  /* 프로필 아이콘 밑으로 이동 */
  position: absolute;
  /* top: 65px; */
  left: 80%;
  transform: translate(-90%, 0);

  z-index: 10;
`;

export const Hr = styled.hr`
  color: gray;

  margin: 0;
  padding: 0, 10px;
`;

function Dropdown({ sortAli, setSortAli, ali }) {
  //모달 오픈 확인 -> props 로 얻음
  const [Open, setOpen] = useState(false);

  function sortChange(value) {
    setSortAli(value);
    setOpen(false);
  }

  return (
    <div className="headerModal">
      {Open ? (
        <Items>
          <>
            <Item onClick={() => setOpen(false)}>{`정렬 선택 ^`}</Item>
            <Hr />
          </>
          {ali.map((manu) => (
            <>
              <Item onClick={() => sortChange(manu[1])}>{manu[0]}</Item>
              <Hr />
            </>
          ))}
        </Items>
      ) : (
        <Items>
          <Item onClick={() => setOpen(true)}>
            {/* <a>{sortAli == 1 ? `인기` : `최신`}</a> */}
            <a>
              <span>{`정렬 변경 `}</span>
              <span className="icon">
                <BiSortDown />
              </span>
            </a>
          </Item>
        </Items>
      )}
    </div>
  );
}

export default Dropdown;
