// 라이브러리
import cookie from "react-cookies";
import styled, { css, keyframes } from "styled-components";

// recoil import
import { useRecoilState, useSetRecoilState } from "recoil";
import { LeaveModalIsOpenAtom } from "../../recoil/atoms/LeaveModalAtom";
import { MyInfoAtom } from "../../recoil/atoms/MyInfoAtom";

// axios instance
import { BaseInstance } from "../../hook/AxiosInstance";


function LeaveCheckModal() {
  const [leaveModalOpen, setLeaveModalOpen] = useRecoilState(LeaveModalIsOpenAtom);
  const setMyinfo = useSetRecoilState(MyInfoAtom);

  const closeLeaveModal = () => {
    setLeaveModalOpen(false)
  }

  const handleLeave = () => {
    // 쿠키 불러오기
    const headers = {
      'Authorization': `Bearer ${cookie.load('accessToken')}`
    }
    BaseInstance.delete('/api/user', { headers: headers })
      .then(async (response) => {
        await cookie.remove('accessToken', {path : '/'})
        setMyinfo(0)
        alert('회원탈퇴가 완료되었습니다')
        window.location.href = '/news'
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <LeaveModalWindow $isActive={leaveModalOpen} onClick={closeLeaveModal}>
      <LeaveModalContainer onClick={(e) => e.stopPropagation()}>
        <p>서비스 탈퇴</p>
        <DivLine />
        <p>회원 탈퇴 시 개인 정보 및 서비스</p> 
        <p>이용내역은 즉시 삭제됩니다.</p>
        <ButtonBox>
          <LeaveButton onClick={handleLeave}>탈퇴</LeaveButton>
          <CancelButton onClick={(e) => setLeaveModalOpen(false) }>취소</CancelButton>
        </ButtonBox>
      </LeaveModalContainer>
    </LeaveModalWindow>
  )

}

export default LeaveCheckModal;


interface modalProps {
  $isActive: boolean;
}

export const LeaveModalWindow = styled.div<modalProps>`
  position: fixed;
  background-color: rgba(217, 217, 217, 0.50);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 110;
  animation: ${({$isActive}) => $isActive ? modalIn : modalOut} 0.3s linear;
`
export const LeaveModalContainer = styled.div`
  position: absolute;
  width: 380px;
  height: 180px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  border: 0;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-weight: 700;
  }
`

export const DivLine = styled.div`
  width: 95%;
  height: 1px;
  margin: 10px 0 20px;
  background-color: #ab9d9d;
`


export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

export const LeaveButton = styled.button`
  width: 100px;
  height : 38px;
  margin-top: 15px;
  background-color: #394867;
  border: 0;
  border-radius: 10px;
  text-decoration: none;
  font-size: 14px;
  color: #fff;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    font-size: 16px;
  }
`

export const CancelButton = styled(LeaveButton)`
  background-color: #F7F7F7;
  color: black;
`

// 모달 창 애니메이션
const modalIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const modalOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  } 
`